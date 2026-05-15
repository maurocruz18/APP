import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonNote,
  IonCard,
  IonCardContent
} from '@ionic/react';

export const Settings: React.FC = () => {
  // Gestão do estado das opções (no futuro, isto será guardado no armazenamento local do telemóvel)
  const [theme, setTheme] = useState('claro');
  const [failAlerts, setFailAlerts] = useState(true);
  const [recoveryAlerts, setRecoveryAlerts] = useState(true);
  const [timezone, setTimezone] = useState('UTC+00:00');
  const [useDeviceTimezone, setUseDeviceTimezone] = useState(true);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="" />
          </IonButtons>
          <IonTitle>Definições</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList inset={true} style={{ marginTop: '16px' }}>
          
          <IonListHeader>
            <IonLabel style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--ion-text-color)' }}>
              Geral
            </IonLabel>
          </IonListHeader>

          {/* SECÇÃO: TEMA */}
          <IonItem lines="none" style={{ marginTop: '8px' }}>
            <IonLabel position="stacked" style={{ marginBottom: '8px' }}>Tema</IonLabel>
            <IonSelect 
              value={theme} 
              onIonChange={e => setTheme(e.detail.value)}
              interface="popover"
              style={{ background: 'var(--ion-item-background)', color: 'var(--ion-text-color)', padding: '10px', borderRadius: '8px', width: '100%' }}
            >
              <IonSelectOption value="claro">Claro</IonSelectOption>
              <IonSelectOption value="escuro">Escuro</IonSelectOption>
              <IonSelectOption value="auto">Automático</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* SECÇÃO: NOTIFICAÇÕES */}
          <IonItem lines="none" style={{ marginTop: '16px' }}>
            <IonLabel style={{ fontWeight: 'bold' }}>Notificações</IonLabel>
          </IonItem>
          
          <IonItem lines="none">
            <IonLabel>
              <div style={{ fontWeight: '500' }}>Avisos de falha</div>
              <IonNote color="medium" style={{ fontSize: '0.8rem' }}>Quando um serviço fica off</IonNote>
            </IonLabel>
            <IonToggle 
              checked={failAlerts} 
              onIonChange={e => setFailAlerts(e.detail.checked)} 
              slot="start" 
            />
          </IonItem>

          <IonItem lines="none">
            <IonLabel>
              <div style={{ fontWeight: '500' }}>Avisos de Recuperação</div>
              <IonNote color="medium" style={{ fontSize: '0.8rem' }}>Quando um serviço volta online</IonNote>
            </IonLabel>
            <IonToggle 
              checked={recoveryAlerts} 
              onIonChange={e => setRecoveryAlerts(e.detail.checked)} 
              slot="start" 
            />
          </IonItem>

          {/* SECÇÃO: SOBRE */}
          <IonItem lines="none" style={{ marginTop: '16px' }}>
            <IonLabel style={{ fontWeight: 'bold' }}>Sobre</IonLabel>
          </IonItem>
          
          <IonCard mode="ios" style={{ margin: '0 16px 16px 16px', boxShadow: 'none', border: '1px solid var(--ion-color-step-150)' }}>
            <IonCardContent>
              <div style={{ fontWeight: '500', color: 'var(--ion-text-color)' }}>Versão: 0.1b</div>
              <div style={{ fontWeight: '500', color: 'var(--ion-text-color)', marginTop: '4px' }}>Tipo: [DEV]</div>
            </IonCardContent>
          </IonCard>

          {/* SECÇÃO: FUSO HORÁRIO */}
          <IonItem lines="none">
            <IonLabel style={{ fontWeight: 'bold' }}>Fuso Horário</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonSelect 
              value={timezone} 
              onIonChange={e => setTimezone(e.detail.value)}
              interface="popover"
              disabled={useDeviceTimezone}
              style={{ background: 'var(--ion-item-background)', color: 'var(--ion-text-color)', padding: '10px', borderRadius: '8px', width: '100%' }}
            >
              <IonSelectOption value="UTC-01:00">UTC-01:00 Açores</IonSelectOption>
              <IonSelectOption value="UTC+00:00">UTC+00:00 Lisboa</IonSelectOption>
              <IonSelectOption value="UTC+01:00">UTC+01:00 Europa Central</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines="none" style={{ marginBottom: '16px' }}>
            <IonLabel>Mesmo do dispositivo</IonLabel>
            <IonToggle 
              checked={useDeviceTimezone} 
              onIonChange={e => setUseDeviceTimezone(e.detail.checked)} 
              slot="start" 
            />
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;