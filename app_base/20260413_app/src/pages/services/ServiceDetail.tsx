import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { 
  checkmarkOutline, 
  closeOutline, 
  pauseOutline, 
  trashOutline, 
  refreshOutline, 
  playOutline 
} from 'ionicons/icons';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { ServiceStatus } from '../../components/ServiceItem';

// 1. Mock de Dados do Histórico de Ping para o Gráfico
const mockChartData = [
  { time: '00:00', ping: 85 }, { time: '01:00', ping: 92 }, { time: '02:00', ping: 90 },
  { time: '03:00', ping: 88 }, { time: '04:00', ping: 110 }, { time: '05:00', ping: 95 },
  { time: '06:00', ping: 89 }, { time: '07:00', ping: 91 }, { time: '08:00', ping: 85 },
];

export const ServiceDetail: React.FC = () => {
  // Para efeitos de teste, podes mudar este estado inicial para 'offline' ou 'paused' 
  // e ver a página inteira a adaptar-se instantaneamente!
  const [status, setStatus] = useState<ServiceStatus>('online');

  // Lógica Dinâmica: Cores e Textos baseados no Estado
  const getBannerConfig = () => {
    switch (status) {
      case 'online':
        return { color: 'success', hex: '#28a745', icon: checkmarkOutline, title: 'ONLINE', subtitle: '100% Operacional' };
      case 'offline':
        return { color: 'danger', hex: '#dc3545', icon: closeOutline, title: 'OFFLINE', subtitle: 'ERROR : 500\nInternal Server Error' };
      case 'paused':
        return { color: 'warning', hex: '#ffc107', icon: pauseOutline, title: 'Pausado', subtitle: 'Hora de Pausa: 15:03' };
      default:
        return { color: 'medium', hex: '#6c757d', icon: refreshOutline, title: 'Desconhecido', subtitle: 'A aguardar dados...' };
    }
  };

  const config = getBannerConfig();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="" />
          </IonButtons>
          <IonTitle>Serviço de Teste</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* 1. HERO BANNER DINÂMICO */}
        <IonCard color={config.color} style={{ margin: '0 0 16px 0', borderRadius: '8px' }}>
          <IonCardContent className="ion-text-center">
            <IonIcon icon={config.icon} style={{ fontSize: '48px', color: 'white' }} />
            <h1 style={{ color: 'white', fontWeight: 'bold', margin: '8px 0' }}>{config.title}</h1>
            <p style={{ color: 'white', whiteSpace: 'pre-line' }}>{config.subtitle}</p>
          </IonCardContent>
        </IonCard>

        {/* 2. ESTATÍSTICAS (Grid) */}
        <IonCard style={{ margin: '0 0 16px 0', borderRadius: '8px' }}>
          <IonCardContent className="ion-no-padding">
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonText>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Ping</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{status === 'online' ? '90ms' : '--ms'}</div>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>P.Médio</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>91ms</div>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText >
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Uptime</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>100%</div>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText >
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>U.Médio</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>99.9%</div>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 3. BOTÕES DE AÇÃO */}
        <IonGrid style={{ padding: 0, marginBottom: '16px' }}>
          <IonRow>
            <IonCol style={{ paddingLeft: 0 }}>
              {status === 'paused' ? (
                <IonButton expand="block" color="success" onClick={() => setStatus('online')}>
                  <IonIcon slot="start" icon={playOutline} /> Iniciar
                </IonButton>
              ) : (
                <IonButton expand="block" color="primary" onClick={() => setStatus('paused')}>
                  <IonIcon slot="start" icon={pauseOutline} /> Pausa
                </IonButton>
              )}
            </IonCol>
            <IonCol>
              <IonButton expand="block" color="dark" fill="solid">
                Testar
              </IonButton>
            </IonCol>
            <IonCol style={{ paddingRight: 0 }}>
              <IonButton expand="block" color="danger">
                <IonIcon slot="start" icon={trashOutline} /> Apagar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* 4. GRÁFICO DE HISTÓRICO */}
        <IonCard style={{ margin: '0', borderRadius: '8px' }}>
          <IonCardContent>
            <IonText >
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Ping</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px' }}>
                {status === 'online' ? '90ms' : '--ms'}
              </div>
            </IonText>
            
            {/* Recharts - Desenhado para ser minimalista como no Mockup */}
            <div style={{ width: '100%', height: 150 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide={true} />
                  <Line 
                    type="monotone" 
                    dataKey="ping" 
                    stroke={config.hex} // A cor da linha muda com o estado!
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ borderTop: '1px solid #eee', marginTop: '16px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <IonText color="medium" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Histórico</IonText>
              <IonIcon icon={refreshOutline} color="medium" />
            </div>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default ServiceDetail;