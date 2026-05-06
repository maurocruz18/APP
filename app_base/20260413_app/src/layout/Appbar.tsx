import Close from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { forwardRef, useEffect, useState } from 'react';
import {
	AppBar,
	IconButtonWithTooltip,
	ListBase,
	Loading,
	Logout,
	MenuItemLink,
	ToggleThemeButton,
	UserMenu,
	useLocaleState,
	useNotify,
	useTranslate,
	WithListContext,
} from 'react-admin';
import { useLocation } from 'react-router-dom';

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
	const translate = useTranslate();
	return (
		<>
			<MenuItemLink
				ref={ref}
				to="/profile"
				className="userMenuItems"
				primaryText={translate('ra.page.profile')}
				leftIcon={<Person />}
				onClick={props.onClick}
				style={{ margin: '0px 10px 0px 10px' }}
			/>
			<MenuItemLink
				ref={ref}
				to="/configuration"
				className="userMenuItems"
				style={{ margin: '0px 10px 0px 10px' }}
				primaryText={translate('ra.page.configuration')}
				leftIcon={<Settings />}
				onClick={props.onClick}
			/>
		</>
	);
});

const CustomUserMenu = () => (
	<UserMenu>
		<ConfigurationMenu />
		<Logout style={{ margin: '0px 10px 0px 10px' }} />
	</UserMenu>
);

const Help = () => {
	const translate = useTranslate();
	const _notify = useNotify();
	const [resource, setResource] = useState<string>();

	const location = useLocation();

	const [locale, _setLocale] = useLocaleState();
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		const element = document.getElementById('help-card');

		if (element) {
			//Fade Modal background
			element.parentElement?.animate(
				{
					opacity: ['100%', '0%'],
					offset: [0, 1],
					easing: ['ease-in'],
				},
				{
					duration: 200,
					iterations: 1,
					fill: 'forwards',
				},
			);

			element.style.borderRadius = '10px';
			element.animate(
				{
					transform: ['translateX(0%)', 'translateX(100%)'],
					offset: [0, 1],
					easing: ['ease-in'],
				},
				{
					duration: 200,
					iterations: 1,
					fill: 'forwards',
				},
			);
		}
		setTimeout(() => {
			setOpen(false);
		}, 200);
	};

	useEffect(() => {
		try {
			if (location?.pathname) {
				const pathArray = location.pathname.split('/');
				if (pathArray && pathArray.length >= 2)
					setResource(pathArray[1] || 'dashboard');
			}
		} catch (_e) {}
	}, [location]);

	return (
		<>
			<IconButtonWithTooltip
				size={'medium'}
				sx={{}}
				label={translate('resources.help.name', { smart_count: 1 })}
				onClick={() => {
					setOpen(true);
				}}
			>
				<HelpOutline />
			</IconButtonWithTooltip>

			<Modal
				open={open}
				onClose={handleClose}
				sx={{
					display: 'flex',
					justifyContent: 'end',
					margin: 'auto auto',
					width: '100%',
					maxWidth: '100%',
					height: '100%',
				}}
			>
				<ListBase
					resource="help"
					filter={{ or: [{ context: resource }, { context: null }] }}
					storeKey={false}
				>
					<WithListContext
						render={({ data, isLoading }) =>
							isLoading ? (
								<Loading />
							) : (
								data && (
									<Card
										id="help-card"
										sx={{
											display: 'flex',
											flexDirection: 'column',
											gap: '1rem',
											animation: '200ms ease-out 0s 1 slideInFromRight',
											width: '400px',
											padding: '1rem',
											m: 1,
											overflowY: 'auto',
										}}
									>
										<Typography>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<Typography
													variant="h6"
													sx={{ textTransform: 'uppercase' }}
												>
													{translate('resources.help.name', { smart_count: 1 })}
												</Typography>
												<IconButton
													sx={{ height: 'fit-content', m: 'auto 0' }}
													onClick={handleClose}
												>
													<Close />
												</IconButton>
											</Box>
											<Divider />
										</Typography>

										{data.map((record) => (
											<Accordion
												key={record.question}
												disableGutters
												sx={{
													width: '100%',
													border: 'none',
													background: (theme) => theme.palette.background.paper,
													'&::before': {
														display: 'none',
													},
												}}
											>
												<AccordionSummary
													expandIcon={<ExpandMore />}
													sx={{
														// border: theme => theme.palette.mode === 'dark' ? '1px solid #666666' : '1px solid lightgrey',
														borderRadius: '10px',
														boxShadow: '1',
														'.MuiAccordionSummary-content': {
															margin: 0,
														},
													}}
												>
													<Typography variant="subtitle1">
														{record.tags?.question
															? (record.tags.question[locale] ??
																record.question)
															: record.question}
													</Typography>
												</AccordionSummary>
												<AccordionDetails
													sx={{
														// border: theme => theme.palette.mode === 'dark' ? '1px solid #666666' : '1px solid lightgrey',
														borderTop: '0',
														boxShadow: '1',
														padding: '1rem',
														maxHeight: '500px',
														borderBottomLeftRadius: '10px',
														borderBottomRightRadius: '10px',
														overflow: 'auto',
														margin: '0 5px',
													}}
												>
													<Typography
														variant="body2"
														sx={{ whiteSpace: 'pre-line' }}
													>
														{record.tags?.answer
															? (record.tags.answer[locale] ?? record.answer)
															: record.answer}
													</Typography>
												</AccordionDetails>
											</Accordion>
										))}
									</Card>
								)
							)
						}
					/>
				</ListBase>
			</Modal>
		</>
	);
};

const AppToolbar = () => {
	return (
		<>
			{/* <RefreshIconButton /> */}
			<ToggleThemeButton />
			<Help />
			{/* <LocalesMenuButton/> */}
		</>
	);
};

const MyAppBar = (props: any) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<AppBar
			{...props}
			sx={{
				boxShadow: 'none',
				position: 'relative',
				width: '100%',
				height: 'fit-content',
			}}
			userMenu={<CustomUserMenu />}
			toolbar={<AppToolbar />}
		>
			<Typography
				style={{
					flex: 1,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					fontWeight: 'bold',
					fontSize: isSmall ? '14px' : '16px',
					textTransform: 'uppercase',
				}}
				id="react-admin-title"
			/>
		</AppBar>
	);
};

export default MyAppBar;
