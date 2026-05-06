import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({ logger: true });

//Proteção da Rota
app.addHook('onRequest', async (request, reply) => {
  const chaveRecebida = request.headers['x-api-key'];
  const chaveVerdadeira = process.env.AGENT_SECRET_KEY;

  if (!chaveVerdadeira || chaveRecebida !== chaveVerdadeira) {
    return reply.code(401).send({ erro: 'Acesso Não Autorizado. API Key inválida.' });
  }
});

//Rota de Monitorização 
app.get('/status', async (request, reply) => {
  const servicosRaw = process.env.SERVICOS_MONITORIZADOS;

  if (!servicosRaw) {
    return reply.code(500).send({ erro: 'Nenhum serviço configurado no .env' });
  }

  // Parse da string para array de objetos
  const servicos = servicosRaw.split(',').map(servicoString => {
    const [nome, url] = servicoString.split('|');
    return { nome, url };
  });

  app.log.info(`A iniciar verificação de ${servicos.length} serviços...`);

  //Execução dos Pings
  const relatorio = await Promise.all(
    servicos.map(async (servico) => {
      const inicioTempo = Date.now();
      try {
        const resposta = await fetch(servico.url, { signal: AbortSignal.timeout(5000) });
        const tempoResposta = Date.now() - inicioTempo;

        return {
          nome: servico.nome,
          url: servico.url,
          estado: resposta.ok ? 'Online' : 'Offline',
          codigoHttp: resposta.status,
          tempoRespostaMs: tempoResposta
        };
      } catch (erro: any) {
        return {
          nome: servico.nome,
          url: servico.url,
          estado: 'Offline',
          codigoHttp: null,
          erroDetalhe: erro.name === 'TimeoutError' ? 'Timeout' : 'Falha de Ligação',
          tempoRespostaMs: Date.now() - inicioTempo
        };
      }
    })
  );

  return reply.send({
    timestamp: new Date().toISOString(),
    totalVerificados: relatorio.length,
    resultados: relatorio
  });
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Mini API a correr e pronta a responder à API Principal!');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();