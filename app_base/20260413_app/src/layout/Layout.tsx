import { App } from '@capacitor/app';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonToolbar,
	type RefresherCustomEvent,
} from '@ionic/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import {
	TitlePortal,
	UserMenu,
	useGetIdentity,
	useLocaleState,
	useRefresh,
	useTheme as useThemeRA,
} from 'react-admin';

const MyLayout = ({ children }: any) => {
	const initialLoad = useRef<boolean>(false);

	const [theme, setTheme] = useThemeRA();
	const [locale, setLocale] = useLocaleState();
	const refresh = useRefresh();
	const { data: identity, isLoading } = useGetIdentity();

	useEffect(() => {
		document.addEventListener('ionBackButton', (event: any) => {
			event.detail.register(-1, () => {
				if (
					window.location.pathname === '/' ||
					window.location.pathname === '/dashboard' ||
					window.location.pathname === '/login'
				)
					App.minimizeApp();
				else history.back();
			});
		});

		const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

		if (darkThemeMq.matches) {
			setTheme('dark');
			EdgeToEdge.setStatusBarColor({ color: '#161c24' });
			EdgeToEdge.setNavigationBarColor({ color: '#161c24' });
		} else {
			setTheme('light');
			EdgeToEdge.setStatusBarColor({ color: '#ffffff' });
			EdgeToEdge.setNavigationBarColor({ color: '#ffffff' });
		}
	}, []);

	useEffect(() => {
		if (isLoading || !identity || initialLoad.current) return;

		initialLoad.current = true;

		if (!theme && identity.favTheme) {
			switch (identity.favTheme) {
				case 'light':
					setTheme('light');
					break;
				case 'dark':
					setTheme('dark');
					break;
			}
		}

		if (!locale && identity.favLang) {
			switch (identity.favLang) {
				case 'pt':
					setLocale('pt');
					break;
				case 'en':
					setLocale('en');
					break;
				case 'fr':
					setLocale('fr');
					break;
			}
		}
	}, [isLoading, identity, locale, setLocale, setTheme, theme]);

	const handleRefresh = (event: RefresherCustomEvent) => {
		refresh();
		setTimeout(() => {
			event.detail.complete();
		}, 1000);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						{history.length &&
							window.location.pathname !== '/' &&
							window.location.pathname !== '/dashboard' && (
								<IonButton onClick={() => history.back()}>
									<ArrowBackIcon />
								</IonButton>
							)}
					</IonButtons>
					<Box
						sx={{
							padding: '0',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: '20px',
						}}
					>
						<TitlePortal sx={{ padding: '8px' }} />
						<UserMenu />
					</Box>
				</IonToolbar>
			</IonHeader>

			<IonContent id="main-content" style={{ overflow: 'auto' }}>
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				{children}
			</IonContent>
		</IonPage>
	);
};

MyLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
	dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	title: PropTypes.string.isRequired,
};

export default MyLayout;
