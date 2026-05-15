import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList,
  IonButton, IonIcon, IonBadge
} from '@ionic/react';
import { logOutOutline, personOutline, mailOutline, shieldCheckmarkOutline } from 'ionicons/icons';

export const UserProfile: React.FC = () => {
  // Mock de dados do utilizador
  const user = {
    nome: "Mauro Cruz",
    email: "mauro.cruz@mitmynid.pt",
    cargo: "Estagiário Sénior",
    versao: "0.1b [DEV]"
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="" />
          </IonButtons>
          <IonTitle>O meu Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 0' }}>
          <IonAvatar style={{ width: '100px', height: '100px', marginBottom: '16px', border: '3px solid var(--ion-color-primary)' }}>
            <img alt="Foto de perfil" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
          <h2 style={{ fontWeight: 'bold', margin: '0' }}>{user.nome}</h2>
          <IonBadge color="primary">{user.cargo}</IonBadge>
        </div>

        <IonList inset={true} style={{ background: 'transparent' }}>
          <IonItem lines="full">
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel>
              <p>Email</p>
              <h3>{user.email}</h3>
            </IonLabel>
          </IonItem>

          <IonItem lines="full">
            <IonIcon icon={shieldCheckmarkOutline} slot="start" />
            <IonLabel>
              <p>Estado da Conta</p>
              <h3 style={{ color: 'var(--ion-color-success)' }}>Ativa / Autenticada</h3>
            </IonLabel>
          </IonItem>
          
          <IonItem lines="none">
            <IonLabel>
              <p>Aplicação</p>
              <h3>Build {user.versao}</h3>
            </IonLabel>
          </IonItem>
        </IonList>

        <div style={{ marginTop: '40px', padding: '0 16px' }}>
          <IonButton expand="block" color="danger" fill="outline">
            <IonIcon slot="start" icon={logOutOutline} />
            Terminar Sessão
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;