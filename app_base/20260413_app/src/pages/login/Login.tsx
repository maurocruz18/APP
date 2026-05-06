import { App } from '@capacitor/app';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { IonPage } from '@ionic/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextInput from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useLogin, useNotify, useTheme, useTranslate } from 'react-admin';
import logoBigImg from '../../assets/MMN_H_RGB.svg';

const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const login = useLogin();
	const notify = useNotify();
	const translate = useTranslate();
	const [_theme, setTheme] = useTheme();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		login({
			username: data.get('username'),
			password: data.get('password'),
		}).catch((_err) => {
			notify('Utilizador ou senha inválidos', { type: 'warning' });
		});
	};

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

	return (
		<IonPage
			style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
		>
			<CssBaseline />
			<Box
				sx={{
					flex: '95%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						maxWidth: '400px',
						margin: '5px',
					}}
				>
					<img src={logoBigImg} alt="logo" style={{ height: 70 }} />
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 4 }}
					>
						<TextInput
							margin="normal"
							fullWidth
							size="small"
							name="username"
							label={translate('ra.auth.username')}
							id="username"
							autoComplete="username"
							autoFocus
						/>
						<TextInput
							margin="normal"
							fullWidth
							size="small"
							name="password"
							label={translate('ra.auth.password')}
							type={showPassword ? 'text' : 'password'}
							id="password"
							autoComplete="current-password"
							InputProps={{
								// <-- This is where the toggle button is added.
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{translate('ra.auth.sign_in')}
						</Button>
						<Grid container>
							<Grid container>
								<Link href="/#/forgotpass">{translate('ra.auth.forgot')}</Link>
							</Grid>
							{/* <Grid item xs sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link href="/#/register">
                  {translate('ra.auth.sign_up')}
                </Link>
              </Grid> */}
						</Grid>
					</Box>
				</Box>
			</Box>
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				flex={'5%'}
			>
				{'Copyright © '}
				<Link color="inherit" target="_blank" href="https://www.mitmynid.com/">
					MITMYNID
				</Link>{' '}
				{new Date().getFullYear()} v{import.meta.env.VITE_VERSION}{' '}
				{import.meta.env.VITE_ENV}
			</Typography>
		</IonPage>
	);
};

export default Login;
