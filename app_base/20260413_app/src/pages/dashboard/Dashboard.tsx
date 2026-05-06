import { useEffect, useState } from 'react';
import {
	Title,
	useAuthenticated,
	useDataProvider,
	useGetIdentity,
	useNavigate,
	usePermissions,
	useStore,
	useTranslate,
} from 'react-admin';
import {
	Responsive,
	type ResponsiveLayouts,
	useContainerWidth,
} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { IonFab, IonFabButton, IonicSlides } from '@ionic/react';
import { HelpOutline, Insights, Key } from '@mui/icons-material';
import AppRegistration from '@mui/icons-material/AppRegistration';
import Cancel from '@mui/icons-material/Cancel';
import RestartAlt from '@mui/icons-material/RestartAlt';
import Save from '@mui/icons-material/Save';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@ionic/react/css/ionic-swiper.css';

const Dashboard = () => {
	useAuthenticated();
	usePermissions();

	const { data: identity } = useGetIdentity();
	const { width, containerRef, mounted } = useContainerWidth({
		measureBeforeMount: true,
	});
	const [editMode, setEditMode] = useState<boolean>(false);
	const dataProvider = useDataProvider();
	const translate = useTranslate();
	const navigate = useNavigate();

	const defaultLayout: ResponsiveLayouts = {
		lg: [
			{ i: 'menu', x: 0, y: 0, w: 12, h: 2, minW: 1, minH: 2 },
			{ i: 'example1', x: 0, y: 0, w: 5, h: 2, minW: 2, minH: 2 },
			{ i: 'example2', x: 5, y: 0, w: 5, h: 2, minW: 2, minH: 2 },
			{ i: 'example3', x: 0, y: 1, w: 10, h: 4, minW: 4, minH: 4 },
			{ i: 'example4', x: 10, y: 0, w: 2, h: 6, minW: 2, minH: 2 },
		],
		xxs: [
			{ i: 'menu', x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
			{ i: 'example1', x: 0, y: 5, w: 1, h: 2, minW: 1, minH: 2 },
			{ i: 'example2', x: 0, y: 10, w: 1, h: 2, minW: 1, minH: 2 },
			{ i: 'example3', x: 0, y: 15, w: 1, h: 6, minW: 1, minH: 2 },
			{ i: 'example4', x: 0, y: 20, w: 1, h: 6, minW: 1, minH: 2 },
		],
	};

	const [layout, setLayout] = useStore<ResponsiveLayouts | undefined>(
		'dashboard.layout',
		defaultLayout,
	);
	const [tempLayout, setTempLayout] = useState<ResponsiveLayouts>();

	useEffect(() => {
		setTempLayout(layout);
		if (editMode)
			dataProvider
				.update('users/prefs', {
					id: identity?.id,
					data: { dashboard_layout: JSON.stringify(layout) },
					previousData: {},
				})
				// .then((resp) => console.log(resp))
				.catch((err) => console.log(err))
				.finally(() => {
					setEditMode(false);
				});
	}, [layout, identity?.id]);

	return (
		<Box>
			<Title title="ra.page.dashboard" />
			<IonFab
				slot="fixed"
				vertical="bottom"
				horizontal="end"
				style={{
					position: 'fixed',
					display: 'flex',
					flexDirection: 'column',
					gap: '15px',
				}}
			>
				{editMode && (
					<>
						<IonFabButton
							color="primary"
							onClick={() => {
								setTempLayout(defaultLayout);
							}}
						>
							<RestartAlt />
						</IonFabButton>
						<IonFabButton
							color="success"
							onClick={() => {
								setLayout(tempLayout);
							}}
						>
							<Save />
						</IonFabButton>
					</>
				)}
				<IonFabButton
					color={editMode ? 'danger' : 'primary'}
					onClick={() => {
						setEditMode((v) => !v);
						setTempLayout(layout);
					}}
				>
					{editMode ? <Cancel /> : <AppRegistration />}
				</IonFabButton>
			</IonFab>
			<Box
				ref={containerRef}
				sx={{
					background: editMode
						? 'repeating-conic-gradient(#00000022 0 25%, #0000 0 50%) 50% / 20px 20px'
						: 'inherit',
					animation: 'scroll 80s linear infinite',
				}}
			>
				{mounted && (
					<Responsive
						className="layout"
						layouts={layout}
						onLayoutChange={(_newLayout, allNewLayouts) =>
							setTempLayout(allNewLayouts)
						}
						rowHeight={125}
						breakpoints={{ lg: 1200, xxs: 0 }}
						cols={{ lg: 12, xxs: 1 }}
						width={width}
						dragConfig={{ enabled: editMode }}
						resizeConfig={{
							enabled: editMode,
							handles: ['n', 's'],
						}}
						style={{ marginBottom: editMode ? 100 : 0 }}
					>
						<Swiper
							key="menu"
							slidesPerView={4}
							spaceBetween={10}
							loop
							navigation
							modules={[Pagination, Navigation, IonicSlides]}
							className="mySwiper"
						>
							<SwiperSlide>
								<Card>
									<CardActionArea
										sx={{
											width: '100px',
											height: '100px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Insights color="primary" fontSize="large" />
										<Typography variant="caption" color="textSecondary">
											{translate(`ra.page.dashboard`)}
										</Typography>
									</CardActionArea>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card>
									<CardActionArea
										onClick={() => navigate('/roles')}
										sx={{
											width: '100px',
											height: '100px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Key color="primary" fontSize="large" />
										<Typography variant="caption" color="textSecondary">
											{translate(`resources.role.name`)}
										</Typography>
									</CardActionArea>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card>
									<CardActionArea
										onClick={() => navigate('/help')}
										sx={{
											width: '100px',
											height: '100px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<HelpOutline color="primary" fontSize="large" />
										<Typography variant="caption" color="textSecondary">
											{translate(`resources.help.name`, { smart_count: 2 })}
										</Typography>
									</CardActionArea>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card>
									<CardActionArea
										sx={{
											width: '100px',
											height: '100px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Insights color="primary" fontSize="large" />
										<Typography variant="caption" color="textSecondary">
											{translate(`ra.page.dashboard`)}
										</Typography>
									</CardActionArea>
								</Card>
							</SwiperSlide>{' '}
							<SwiperSlide>
								<Card>
									<CardActionArea
										sx={{
											width: '100px',
											height: '100px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Insights color="primary" fontSize="large" />
										<Typography variant="caption" color="textSecondary">
											{translate(`ra.page.dashboard`)}
										</Typography>
									</CardActionArea>
								</Card>
							</SwiperSlide>
						</Swiper>

						<Card
							key="example1"
							sx={{
								background: (theme) => theme.palette.primary.main,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography color="secondary">Exemplo 1</Typography>
						</Card>
						<Card
							key="example2"
							sx={{
								background: (theme) => theme.palette.warning.main,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography color="secondary">Exemplo 2</Typography>
						</Card>
						<Card
							key="example3"
							sx={{
								background: (theme) => theme.palette.success.main,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography color="secondary">Exemplo 3</Typography>
						</Card>
						<Card
							key="example4"
							sx={{
								background: (theme) => theme.palette.error.main,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography color="secondary">Exemplo 4</Typography>
						</Card>
					</Responsive>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;
