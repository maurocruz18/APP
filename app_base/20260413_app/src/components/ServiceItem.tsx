import React from 'react';
import { IonItem, IonLabel, IonIcon, IonNote } from '@ionic/react';
import { 
  checkmarkCircle, 
  alertCircle, 
  pauseCircle, 
  build, 
  helpCircle, 
  pulseOutline 
} from 'ionicons/icons';

// Definir os estados possíveis para garantir segurança no código
export type ServiceStatus = 'online' | 'offline' | 'paused' | 'maintenance' | 'unknown';

interface ServiceItemProps {
  name: string;
  status: ServiceStatus;
  detailText?: string; // Pode ser "Ping: 90ms", "Erro: 500", etc.
  onClick?: () => void;
  routerLink?: string;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ name, status, detailText, onClick, routerLink }) => {
  
  // Função para mapear o estado para a cor correspondente no variables.css
  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'online': return 'success';
      case 'offline': return 'danger';
      case 'paused': return 'warning';
      case 'maintenance': return 'info';
      default: return 'medium';
    }
  };

  // Função para mapear o estado para o ícone correto
  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'online': return checkmarkCircle; // Ou pulseOutline se preferires o da tua imagem
      case 'offline': return alertCircle;
      case 'paused': return pauseCircle;
      case 'maintenance': return build;
      default: return helpCircle;
    }
  };

  const color = getStatusColor(status);

  return (
    <IonItem button detail={true} onClick={onClick} routerLink={routerLink}>
      <IonIcon 
        icon={getStatusIcon(status)} 
        color={color} 
        slot="start" 
        style={{ fontSize: '24px' }} 
      />
      <IonLabel>
        <h2 style={{ fontWeight: 'bold', color: `var(--ion-color-${color})` }}>
          {name}
        </h2>
      </IonLabel>
      {detailText && (
        <IonNote slot="end" color={status === 'offline' ? 'danger' : status === 'paused' ? 'warning' : 'medium'}>
          {detailText}
        </IonNote>
      )}
    </IonItem>
  );
};