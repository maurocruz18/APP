import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonList,
  IonFab,
  IonFabButton,
  IonLabel,
  IonItemDivider
} from '@ionic/react';
import { settingsOutline, personOutline, add } from 'ionicons/icons';
import { StatsBoard } from '../../components/StatsBoard';
import { ServiceItem, ServiceStatus } from '../../components/ServiceItem';

// 1. Definição da estrutura de dados de um Serviço
interface ServiceData {
  id: string;
  name: string;
  status: ServiceStatus;
  detailText?: string;
}

// 2. Dados simulados para replicar perfeitamente o teu Mockup
const MOCK_SERVICES: ServiceData[] = [
  { id: '1', name: 'Serviço 1', status: 'online', detailText: 'Ping: 90ms' },
  { id: '2', name: 'Serviço 2', status: 'offline', detailText: 'Erro: 500' },
  { id: '3', name: 'Serviço 3', status: 'maintenance' },
  { id: '4', name: 'Serviço 4', status: 'online', detailText: 'Ping: 90ms' },
  { id: '5', name: 'Serviço 5', status: 'unknown' },
  { id: '6', name: 'Serviço 6', status: 'paused', detailText: 'Pausado: 15:03' },
];

export const Dashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  // Lógica simples para filtrar a lista através da barra de pesquisa
  const filteredServices = MOCK_SERVICES.filter(service => 
    service.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      {/* CABEÇALHO */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          {/* Espaço para o teu Logótipo à esquerda */}
          <IonButtons slot="start">
            <IonButton>
              <img src="/favicon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
            </IonButton>
          </IonButtons>

          {/* Botões de Definições e Perfil à direita */}
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon icon={settingsOutline} color="dark" />
            </IonButton>
            <IonButton>
              <IonIcon icon={personOutline} color="dark" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* CONTEÚDO PRINCIPAL */}
      <IonContent fullscreen className="ion-padding">
        
        {/* SECÇÃO: ESTATÍSTICAS */}
        <IonLabel style={{ fontWeight: 'bold', marginLeft: '4px', fontSize: '1.1rem' }}>
          Estatísticas
        </IonLabel>
        
        <div style={{ marginTop: '10px', marginBottom: '24px' }}>
          <StatsBoard 
            online={2} 
            offline={1} 
            paused={1} 
            maintenance={1} 
            unknown={1} 
          />
        </div>

        {/* SECÇÃO: LISTA DE SERVIÇOS */}
        <IonLabel style={{ fontWeight: 'bold', marginLeft: '4px', fontSize: '1.1rem' }}>
          Serviços
        </IonLabel>

        <IonSearchbar 
          placeholder="Value" 
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          style={{ marginTop: '10px', paddingLeft: 0, paddingRight: 0 }}
        />

        <IonList lines="none" style={{ background: 'transparent' }}>
          {filteredServices.map(service => (
            <ServiceItem
              key={service.id}
              name={service.name}
              status={service.status}
              detailText={service.detailText}
              
              routerLink={`/services/${service.id}`} 
            />
          ))}
        </IonList>

        {/* BOTÃO FLUTUANTE (FAB) PARA ADICIONAR AGENTE */}
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