import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton,
  IonIcon, IonSearchbar, IonList, IonFab, IonFabButton, IonLabel,
  IonSegment, IonSegmentButton, IonItem, IonBadge, IonNote
} from '@ionic/react';
import { settingsOutline, personOutline, add, serverOutline, alertCircleOutline } from 'ionicons/icons';
import { StatsBoard } from '../../components/StatsBoard';
import { ServiceItem, ServiceStatus } from '../../components/ServiceItem';

// 1. Tipos de Dados
interface ServiceData {
  id: string;
  name: string;
  status: ServiceStatus;
  detailText?: string;
}

interface ServerData {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline';
  servicesCount: number;
}

// 2. Dados Simulados
const MOCK_SERVICES: ServiceData[] = [
  { id: '1', name: 'API Bizcargo', status: 'online', detailText: 'Ping: 90ms' },
  { id: '2', name: 'Database Sync', status: 'offline', detailText: 'Erro: 500' },
  { id: '3', name: 'Portal Interno', status: 'maintenance' },
  { id: '4', name: 'Faturação', status: 'online', detailText: 'Ping: 45ms' },
];

const MOCK_SERVERS: ServerData[] = [
  { id: '1', name: 'Servidor Produção Lisboa', url: '192.168.1.10:3000', status: 'online', servicesCount: 3 },
  { id: '2', name: 'Agente Porto [DEV]', url: '10.0.0.5:3000', status: 'offline', servicesCount: 1 },
];

export const Dashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState<'servers' | 'services'>('servers'); // Estado para controlar a vista ativa

  // Filtros de pesquisa
  const filteredServices = MOCK_SERVICES.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase()));
  const filteredServers = MOCK_SERVERS.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <img src="/favicon.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '4px' }} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon icon={settingsOutline} />
            </IonButton>
            <IonButton routerLink="/profile">
              <IonIcon icon={personOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        
        {/* ESTATÍSTICAS GLOBAIS */}
        <IonLabel style={{ fontWeight: 'bold', marginLeft: '4px', fontSize: '1.1rem', color: 'var(--ion-text-color)' }}>
          Visão Global
        </IonLabel>
        <div style={{ marginTop: '10px', marginBottom: '16px' }}>
          <StatsBoard online={2} offline={1} paused={0} maintenance={1} unknown={0} />
        </div>

        {/* SELETOR DE VISTAS (SEGMENT) */}
        <IonSegment value={view} onIonChange={e => setView(e.detail.value as 'servers' | 'services')} style={{ marginBottom: '16px' }}>
          <IonSegmentButton value="servers">
            <IonLabel>Servidores</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="services">
            <IonLabel>Serviços</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* BARRA DE PESQUISA */}
        <IonSearchbar 
          placeholder={`Pesquisar ${view === 'servers' ? 'servidor' : 'serviço'}...`}
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        />

        {/* LISTAGEM CONDICIONAL */}
        <IonList lines="none" style={{ background: 'transparent' }}>
          
          {/* VISTA A: SERVIDORES */}
          {view === 'servers' && filteredServers.map(server => (
            <IonItem key={server.id} button detail={true} routerLink={`/servers/${server.id}`}>
              <IonIcon 
                icon={server.status === 'online' ? serverOutline : alertCircleOutline} 
                color={server.status === 'online' ? 'success' : 'danger'} 
                slot="start" 
                style={{ fontSize: '24px' }} 
              />
              <IonLabel>
                <h2 style={{ fontWeight: 'bold', color: 'var(--ion-text-color)' }}>{server.name}</h2>
                <p style={{ color: 'var(--ion-color-medium)', fontSize: '0.8rem' }}>{server.url}</p>
              </IonLabel>
              <IonBadge slot="end" color="light">{server.servicesCount} serviços</IonBadge>
            </IonItem>
          ))}

          {/* VISTA B: SERVIÇOS (A lista plana) */}
          {view === 'services' && filteredServices.map(service => (
            <ServiceItem
              key={service.id}
              name={service.name}
              status={service.status}
              detailText={service.detailText}
              routerLink={`/services/${service.id}`} 
            />
          ))}

        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="dark" routerLink="/services/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Dashboard;