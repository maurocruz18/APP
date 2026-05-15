import React from 'react';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';

// Tipagem forte para as propriedades, cumprindo as boas práticas TypeScript
interface StatsBoardProps {
  online: number;
  offline: number;
  paused: number;
  maintenance: number;
  unknown: number;
}

export const StatsBoard: React.FC<StatsBoardProps> = ({ 
  online, offline, paused, maintenance, unknown 
}) => {
  return (
    <IonCard>
      <IonCardContent className="ion-no-padding">
        <IonGrid>
          <IonRow className="ion-text-center ion-align-items-center">
            <IonCol>
              <IonText color="success">
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>ONLINE</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{online}</div>
              </IonText>
            </IonCol>
            
            <IonCol>
              <IonText color="danger">
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>OFFLINE</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{offline}</div>
              </IonText>
            </IonCol>

            <IonCol>
              <IonText color="warning">
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>PAUSADO</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{paused}</div>
              </IonText>
            </IonCol>

            <IonCol>
              <IonText color="info">
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>MANUT.</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{maintenance}</div>
              </IonText>
            </IonCol>

            <IonCol>
              <IonText color="medium">
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>DESC.</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{unknown}</div>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};