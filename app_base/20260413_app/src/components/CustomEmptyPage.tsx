import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	CreateButton,
	useListContext,
	useResourceDefinition,
	useTranslate,
} from 'react-admin';
import EmptyImg from '../assets/dreamer.svg';

const CustomEmptyPage = ({ hasCreate }: { hasCreate?: boolean }) => {
	const { resource } = useListContext();
	const translate = useTranslate();
	const resourceDef = useResourceDefinition();

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				width: '100%',
			}}
		>
			<Box textAlign="center" m={1}>
				<img
					src={EmptyImg}
					style={{ maxWidth: '500px', marginBottom: 50 }}
					alt="empty"
				/>
				<Typography
					variant="h5"
					color={'textSecondary'}
					fontWeight={'bold'}
					sx={{ fontVariant: 'all-petite-caps' }}
				>
					{translate('ra.page.empty', { name: resource })}
				</Typography>
				{(hasCreate ||
					(hasCreate === undefined &&
						resourceDef &&
						resourceDef.hasCreate)) && <CreateButton variant="contained" />}
			</Box>
		</Box>
	);
};

export default CustomEmptyPage;
