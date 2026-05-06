import HelpOutline from '@mui/icons-material/HelpOutline';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
	BooleanInput,
	Edit,
	NumberInput,
	required,
	SimpleForm,
	TextInput,
	TranslatableInputs,
} from 'react-admin';
import { locales } from '../../i18n';
import useCheckResourceLocale from '../../utils/useCheckResourceLocale';

export const HelpEdit = () => {
	useCheckResourceLocale();

	return (
		<Edit mutationMode="pessimistic">
			<SimpleForm>
				<Box sx={{ display: 'flex', width: '100%', justifyContent: 'right' }}>
					<BooleanInput source="active" defaultValue={true} />
				</Box>

				<Box
					display={'grid'}
					gridTemplateColumns={{ md: '110px 1fr 4fr' }}
					gap={'1rem'}
					width={'100%'}
				>
					<NumberInput source="sequence" fullWidth defaultValue={99} step={1} />
					<Box sx={{ display: 'flex', gap: '2px' }}>
						<TextInput source="context" fullWidth />
						<Tooltip
							title={
								<Box>
									<Typography fontSize={'small'}>
										Em que páginas mostrar. (Ex: "help")
									</Typography>
									<Typography fontSize={'small'}>
										Manter vazio para mostrar em toda a aplicação
									</Typography>
								</Box>
							}
						>
							<HelpOutline color="primary" sx={{ mt: '7px' }} />
						</Tooltip>
					</Box>
					<TextInput source="question" fullWidth validate={required()} />
				</Box>
				<TextInput
					source="answer"
					fullWidth
					validate={required()}
					multiline
					minRows={3}
				/>

				<TranslatableInputs fullWidth locales={locales} defaultLocale="pt-pt">
					<TextInput source="tags.question" fullWidth />
					<TextInput source="tags.answer" fullWidth multiline minRows={3} />
				</TranslatableInputs>
			</SimpleForm>
		</Edit>
	);
};
