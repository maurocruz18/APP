import Box from '@mui/material/Box';
import {
	Datagrid,
	List,
	TextField,
	TextInput,
	useTranslate,
} from 'react-admin';

export const RoleList = () => {
	const translate = useTranslate();

	const filters = [
		<TextInput
			key={'description'}
			source="description"
			label={translate('pos.labels.search')}
			alwaysOn
			resettable={true}
		/>,
	];

	return (
		<List
			exporter={false}
			filters={filters}
			title="resources.role.name"
			sx={{ paddingLeft: '10px' }}
		>
			<Datagrid bulkActionButtons={false} empty={false}>
				<TextField source="description" label="resources.role.fields.nome" />
				<Box sx={{ gap: '4px', float: 'right' }}></Box>
			</Datagrid>
		</List>
	);
};
