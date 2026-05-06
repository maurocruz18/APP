import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'react-admin';

const SubMenu = (props: any) => {
	const { handleToggle, isOpen, name, icon, children, dense } = props;
	const translate = useTranslate();

	const header = (
		<MenuItem
			dense={dense}
			onClick={handleToggle}
			className={`sidebar open`}
			sx={{ color: 'primary' }}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
				<Box mr={'0.25em'} mt={'0.25em'} sx={{ position: 'relative' }}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemIcon
						sx={{
							position: 'absolute',
							/* property name | duration | timing function | delay */
							color: (theme) => theme.palette.primary.main,
							transition: 'initial 1.6s ease-in 0s',
							bottom: '-10%',
							right: '150%',
						}}
					>
						{isOpen ? <ExpandMore /> : <ExpandLess />}
					</ListItemIcon>
				</Box>
				<Box>
					<ListItemText>{translate(name)}</ListItemText>
				</Box>
			</Box>
			<ListItemIcon
				sx={{
					color: 'default',
					transition: 'color 0.2s ease-in-out 0s',
				}}
			>
				{isOpen ? <ExpandMore /> : <ExpandLess />}
			</ListItemIcon>
		</MenuItem>
	);

	return (
		<>
			{header}

			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List
					dense={dense}
					component="div"
					disablePadding
					sx={{
						'&a': {
							transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
							paddingLeft: 2,
						},
						marginBottom: '10px',
						marginLeft: 0,
					}}
				>
					{children}
				</List>
			</Collapse>
		</>
	);
};

export default SubMenu;
