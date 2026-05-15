import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonCard, IonCardContent, IonList, IonLabel,
  IonButton, IonIcon, useIonAlert
} from '@ionic/react';
import { trashOutline, serverOutline, pauseOutline } from 'ionicons/icons';
import { ServiceItem, ServiceStatus } from '../../components/ServiceItem';

export const ServerDetail: React.FC = () => {
  // Hook nativo do Ionic para criar caixas de diálogo (Alerts)
  const [presentAlert] = useIonAlert();

  // 1. Mock Data do Agente (Mais tarde virá do PostgreSQL via ID do URL)
  const server = { 
    id: '1', 
    name: 'Servidor Produção Lisboa', 
    url: '192.168.1.10:3000', 
    status: 'online' 
  };

  // 2. Mock Data dos Serviços que pertencem EXCLUSIVAMENTE a este Agente
  const serverServices = [
    { id: '1', name: 'API Bizcargo', status: 'online' as ServiceStatus, detailText: 'Ping: 90ms' },
    { id: '2', name: 'Database Sync', status: 'offline' as ServiceStatus, detailText: 'Erro: 500' },
  ];

  // 3. Função de Remoção com a Regra de Ouro do "Soft Delete"
  const handleRemoveServer = () => {
    presentAlert({
      header: 'Remover Servidor?',
      message: 'O servidor será marcado como inativo e deixará de ser consultado. O histórico de logs será mantido intacto na base de dados.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Remover', 
          role: 'destructive', 
          handler: () => console.log(`A executar Soft Delete (ativo: false) no servidor ID: ${server.id}`) 
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="" />
          </IonButtons>
          <IonTitle>Detalhe do Agente</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* HERO BANNER DO SERVIDOR */}
        <IonCard color={server.status === 'online' ? 'success' : 'danger'} style={{ margin: '0 0 24px 0', borderRadius: '8px' }}>
          <IonCardContent className="ion-text-center">
            <IonIcon icon={serverOutline} style={{ fontSize: '48px', color: 'white' }} />
            <h2 style={{ color: 'white', fontWeight: 'bold', margin: '8px 0' }}>{server.name}</h2>
            <p style={{ color: 'white', margin: 0, opacity: 0.9 }}>URL: {server.url}</p>
          </IonCardContent>
        </IonCard>

        {/* AÇÕES GLOBAIS DO SERVIDOR */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <IonButton expand="block" color="warning" style={{ flex: 1 }}>
            <IonIcon slot="start" icon={pauseOutline} /> Pausar
          </IonButton>
          
          <IonButton expand="block" color="danger" fill="outline" style={{ flex: 1 }} onClick={handleRemoveServer}>
            <IonIcon slot="start" icon={trashOutline} /> Remover
          </IonButton>
        </div>

        {/* LISTA DE SERVIÇOS VINCULADOS */}
        <IonLabel style={{ fontWeight: 'bold', marginLeft: '4px', fontSize: '1.1rem', color: 'var(--ion-text-color)' }}>
          Serviços a correr neste Agente
        </IonLabel>

        <IonList lines="none" style={{ background: 'transparent', marginTop: '10px' }}>
          {serverServices.map(service => (
            <ServiceItem
              key={service.id}
              name={service.name}
              status={service.status}
              detailText={service.detailText}
              // O clique navega para o nosso ecrã de detalhe do serviço!
              routerLink={`/services/${service.id}`}
            />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default ServerDetail;