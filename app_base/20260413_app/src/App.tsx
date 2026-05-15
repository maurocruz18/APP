import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables (Onde definimos as nossas cores na Fase 1) */
import './theme/variables.css';

/* Importação dos nossos Ecrãs */
import Dashboard from './pages/dashboard/Dashboard';
import ServiceDetail from './pages/services/ServiceDetail';
import Settings from './pages/settings/Settings';
import AddServer from './pages/services/AddServer';
import UserProfile from './pages/user/UserProfile';
import ServerDetail from './pages/servers/ServerDetail';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
          {/* Rota Principal: Dashboard */}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          {/* Rota de Detalhe: Passamos um parâmetro dinâmico ":id" */}
          <Route exact path="/services/:id">
            <ServiceDetail />
          </Route>

          {/* Rota de Definições */}
          <Route exact path="/settings">
            <Settings />
          </Route>

          {/* Redirecionamento padrão: se o URL estiver vazio, vai para o Dashboard */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          {/* Rota para Adicionar Servidor */}
          <Route exact path="/services/add">
            <AddServer />
           </Route>

          {/* Rota para Perfil do Utilizador */}
          <Route exact path="/profile">
           <UserProfile />
           </Route>

           {/* Rota de Detalhe do Servidor/Agente */}
          <Route exact path="/servers/:id">
            <ServerDetail />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;