import { IonApp, setupIonicReact } from '@ionic/react';
import { Admin, CustomRoutes, fetchUtils, Resource } from 'react-admin';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { i18nProvider } from './i18n';
import { ErrorBoundaryFallback } from './layout/ErrorBoundaryFallback';
import MyLayout from './layout/Layout';
import DashboardWrapper from './pages/dashboard';
import { help } from './pages/help';
import Login from './pages/login/Login';
import { roles } from './pages/roles';
import { Unauthorized } from './pages/Unauthorized';
import { authProvider } from './providers/authProvider';
import lb4Provider from './providers/data-provider';
import themes from './theme';

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
import './App.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const httpClient = (url: string, options = {}) => {
	//options.headers = new Headers({ Accept: "application/json", Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}` });

	return fetchUtils.fetchJson(url, options);
};

const aggregate = (_resource: any) => {
	// switch(resource){
	//   case 'users':
	//     return [
	//       {
	//         relation: "roles",
	//       },
	//     ];
	//   default:
	//     break;
	// }

	return [];
};

export const url = import.meta.env.VITE_REST_API
	? import.meta.env.VITE_REST_API
	: 'http://127.0.0.1:13001/';

const dataProvider = lb4Provider(url, aggregate, httpClient);

const App: React.FC = () => {
	const router = createBrowserRouter([
		{
			path: '*',
			element: (
				<Admin
					lightTheme={themes.light}
					darkTheme={themes.dark}
					defaultTheme="light"
					layout={MyLayout}
					authProvider={authProvider}
					loginPage={Login}
					dashboard={DashboardWrapper}
					dataProvider={dataProvider}
					i18nProvider={i18nProvider}
					error={ErrorBoundaryFallback}
					disableTelemetry
					requireAuth
				>
					{(permissions?: string[]) => {
						return [
							<Resource key={'roles'} name="roles" {...roles(permissions)} />,
							<Resource key={'help'} name="help" {...help(permissions)} />,

							<Resource key={'user-roles'} name="user-roles" />,

							<CustomRoutes key={'CustomRoutes'}>
								<Route
									key={'dashboard'}
									path="/dashboard"
									element={<DashboardWrapper />}
								/>
								<Route
									key={'/unauthorized'}
									path="/unauthorized"
									element={<Unauthorized />}
								/>
							</CustomRoutes>,
						];
					}}
				</Admin>
			),
		},
	]);
	return (
		<IonApp>
			<RouterProvider router={router} />
		</IonApp>
	);
};

export default App;
