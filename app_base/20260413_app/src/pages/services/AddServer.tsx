import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput,
  IonButton, IonIcon, IonNote, IonRange, IonFooter
} from '@ionic/react';
import { serverOutline, keyOutline, globeOutline, timerOutline, saveOutline } from 'ionicons/icons';

export const AddServer: React.FC = () => {
  const [serverName, setServerName] = useState('');
  const [agentUrl, setAgentUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [interval, setInterval] = useState(30);

  const handleSave = () => {
    console.log('A guardar Agente:', { serverName, agentUrl, apiKey, interval });
    // Lógica para persistir no PostgreSQL via API Principal virá a seguir
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="" />
          </IonButtons>
          <IonTitle>Novo Agente</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="ion-text-center" style={{ margin: '20px 0' }}>
          <IonIcon icon={serverOutline} style={{ fontSize: '64px', color: 'var(--ion-color-primary)' }} />
          <p style={{ color: 'var(--ion-color-medium)' }}>Configure uma nova Mini API para monitorização local</p>
        </div>

        <IonList inset={true} style={{ background: 'transparent' }}>
          <IonItem lines="full">
            <IonIcon icon={serverOutline} slot="start" />
            <IonLabel position="stacked">Nome do Agente</IonLabel>
            <IonInput 
              placeholder="Ex: Servidor Produção Lisboa" 
              value={serverName}
              onIonInput={e => setServerName(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="full">
            <IonIcon icon={globeOutline} slot="start" />
            <IonLabel position="stacked">URL do Agente</IonLabel>
            <IonInput 
              type="url" 
              placeholder="http://ip-do-servidor:3000/status" 
              value={agentUrl}
              onIonInput={e => setAgentUrl(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="full">
            <IonIcon icon={keyOutline} slot="start" />
            <IonLabel position="stacked">API Key (Porteiro Secreto)</IonLabel>
            <IonInput 
              type="password" 
              placeholder="Inserir chave de segurança" 
              value={apiKey}
              onIonInput={e => setApiKey(e.detail.value!)}
            />
          </IonItem>

          <div style={{ padding: '16px' }}>
            <IonLabel style={{ display: 'flex', alignItems: 'center' }}>
              <IonIcon icon={timerOutline} style={{ marginRight: '8px' }} />
              Intervalo de Verificação: <strong>{interval}s</strong>
            </IonLabel>
            <IonRange 
              min={5} 
              max={300} 
              value={interval} 
              onIonChange={e => setInterval(e.detail.value as number)}
              color="primary"
            />
            <IonNote style={{ fontSize: '0.8rem' }}>
              Frequência com que a API Principal consulta este Agente.
            </IonNote>
          </div>
        </IonList>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div style={{ padding: '16px' }}>
          <IonButton expand="block" color="dark" onClick={handleSave}>
            <IonIcon slot="start" icon={saveOutline} />
            Registar Agente
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default AddServer;