import { IonPage } from '@ionic/react';
import History from '@mui/icons-material/History';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {
	useResetErrorBoundaryOnLocationChange,
	useTranslate,
} from 'react-admin';
import ErrorImg from '../assets/algo_errado.svg';
import theme from '../theme/lightTheme';

export const ErrorBoundaryFallback = ({
	resetErrorBoundary,
	errorInfo,
}: any) => {
	useResetErrorBoundaryOnLocationChange(resetErrorBoundary);
	const translate = useTranslate();
	return (
		<IonPage style={{ overflow: 'auto' }}>
			<Root>
				<div className={ErrorBoundaryFallbackClasses.message}>
					<Typography sx={{ color: (theme) => theme.palette.primary.main }}>
						<img src={ErrorImg} alt="Error" />
					</Typography>
					{/* <Typography component={"h1"} sx={{ fontSize: '40px', fontWeight: 'bold', color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }}>{translations.ra.page.error}</Typography> */}
					<Typography
						component={'div'}
						sx={{
							fontSize: '20px',
							color: (theme) =>
								theme.palette.mode === 'dark' ? 'white' : 'black',
						}}
					>
						{translate('ra.message.error')}
					</Typography>
					{import.meta.env.VITE_ENV !== 'production' && (
						<details>{errorInfo.componentStack}</details>
					)}
				</div>
				<div className={ErrorBoundaryFallbackClasses.toolbar}>
					<Button
						sx={{
							backgroundColor: theme.palette.primary.main,
							color: 'white',
							':hover': { backgroundColor: theme.palette.primary.dark },
						}}
						variant="contained"
						color="inherit"
						startIcon={<History />}
						onClick={() => {
							window.history.go(-1);
						}}
					>
						{translate('ra.action.back')}
					</Button>
				</div>
			</Root>
		</IonPage>
	);
};

ErrorBoundaryFallback.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	location: PropTypes.object,
};

const PREFIX = 'RaUnauthorized';

export const ErrorBoundaryFallbackClasses = {
	icon: `${PREFIX}-icon`,
	message: `${PREFIX}-message`,
	toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('div', {
	name: PREFIX,
	overridesResolver: (styles) => styles.root,
})(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	[theme.breakpoints.up('md')]: {
		height: '100%',
	},
	[theme.breakpoints.down('md')]: {
		height: '100vh',
		marginTop: '-3em',
	},

	[`& .${ErrorBoundaryFallbackClasses.icon}`]: {
		width: '9em',
		height: '9em',
	},

	[`& .${ErrorBoundaryFallbackClasses.message}`]: {
		textAlign: 'center',
		fontFamily: 'Roboto, sans-serif',
		// opacity: 0.5,
		margin: '0 1em',
	},

	[`& .${ErrorBoundaryFallbackClasses.toolbar}`]: {
		textAlign: 'center',
		marginTop: '2em',
	},
}));
