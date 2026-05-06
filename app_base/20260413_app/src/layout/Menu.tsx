import { IonContent, IonMenu, IonToolbar } from '@ionic/react';
import Insights from '@mui/icons-material/Insights';
import { Box, Typography } from '@mui/material';
import { MenuItemLink, useTranslate } from 'react-admin';
import logoBigImg from '../assets/MMN_H_RGB.svg';

const Menu = () => {
	const translate = useTranslate();

	return (
		<IonMenu contentId="main-content">
			<IonToolbar>
				<Box
					sx={{
						paddingTop: '70px',
						paddingBottom: '20px',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<img src={logoBigImg} alt="logo" style={{ maxWidth: '220px' }} />
				</Box>
			</IonToolbar>
			<IonContent>
				<MenuItemLink
					to={{ pathname: '/dashboard' }}
					className={`submenuItem open`}
					primaryText={translate(`ra.page.dashboard`)}
					sx={{ color: 'default' }}
					leftIcon={<Insights />}
					dense={false}
				/>
			</IonContent>
			<Box sx={{ mb: 4, ml: 1 }}>
				<Typography variant="caption" color="textDisabled">
					v{import.meta.env.VITE_VERSION} {import.meta.env.VITE_ENV}
				</Typography>
			</Box>
		</IonMenu>
	);
};

export default Menu;
