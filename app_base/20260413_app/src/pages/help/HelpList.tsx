import Circle from '@mui/icons-material/Circle';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import {
	BooleanField,
	Datagrid,
	FilterLiveSearch,
	FunctionField,
	List,
	NullableBooleanInput,
	TextField,
	useTranslate,
	WithRecord,
} from 'react-admin';
import CustomConfirmButtonToolTip from '../../components/CustomConfirmButtonToolTip';
import CustomEmptyPage from '../../components/CustomEmptyPage';
import useCheckResourceLocale from '../../utils/useCheckResourceLocale';

export const HelpList = () => {
	useCheckResourceLocale();

	const _translate = useTranslate();

	const filters = [
		<FilterLiveSearch
			key={'context'}
			fullWidth
			source="context"
			label="resources.help.fields.context"
			alwaysOn
		/>,
		<FilterLiveSearch
			key={'question'}
			fullWidth
			source="question"
			label="resources.help.fields.question"
			alwaysOn
		/>,
		<NullableBooleanInput key={'active'} source="active" alwaysOn />,
	];

	return (
		<List
			// pagination={<CustomPagination />}
			// perPage={perPageDefault}
			storeKey={false}
			exporter={false}
			filters={filters}
			empty={<CustomEmptyPage />}
		>
			<Datagrid
				bulkActionButtons={false}
				rowClick="edit"
				empty={<CustomEmptyPage hasCreate={false} />}
				sx={{
					'& .column-sequence': { width: '1%' },
				}}
			>
				<TextField source="sequence" />

				<TextField source="context" />
				<TextField source="question" />

				<FunctionField
					source="pt"
					sortable={false}
					render={(record: any) =>
						record.tags?.question?.['pt-pt'] && record.tags.answer['pt-pt'] ? (
							<Circle sx={{ fontSize: '0.8rem', color: '#6b6b6b' }} />
						) : (
							<CircleOutlined sx={{ fontSize: '0.8rem', color: '#aeaeae' }} />
						)
					}
				/>
				<FunctionField
					source="en"
					sortable={false}
					render={(record: any) =>
						record.tags?.question?.['en-us'] && record.tags.answer['en-us'] ? (
							<Circle sx={{ fontSize: '0.8rem', color: '#6b6b6b' }} />
						) : (
							<CircleOutlined sx={{ fontSize: '0.8rem', color: '#aeaeae' }} />
						)
					}
				/>
				<FunctionField
					source="fr"
					sortable={false}
					render={(record: any) =>
						record.tags?.question?.['fr-fr'] && record.tags.answer['fr-fr'] ? (
							<Circle sx={{ fontSize: '0.8rem', color: '#6b6b6b' }} />
						) : (
							<CircleOutlined sx={{ fontSize: '0.8rem', color: '#aeaeae' }} />
						)
					}
				/>

				<BooleanField source="active" />
				<FunctionField
					source="updated"
					render={(record: any) => record.updated.substring(0, 10)}
				/>

				<Box sx={{ gap: '4px', float: 'right' }}>
					<WithRecord
						render={(record: any) => {
							return (
								<CustomConfirmButtonToolTip
									label={'ra.action.delete'}
									color="error"
									icon={<DeleteForever />}
									id={record.id}
								/>
							);
						}}
					/>
				</Box>
			</Datagrid>
		</List>
	);
};
