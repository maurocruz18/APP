import Box from '@mui/material/Box';
import {
	BooleanInput,
	Create,
	NumberInput,
	required,
	SimpleForm,
	TextInput,
	TranslatableInputs,
	useTranslate,
} from 'react-admin';
import { locales } from '../../i18n';
import useCheckResourceLocale from '../../utils/useCheckResourceLocale';

export const HelpCreate = () => {
	useCheckResourceLocale();

	const _translate = useTranslate();

	return (
		<Create>
			<SimpleForm>
				<Box sx={{ display: 'flex', width: '100%', justifyContent: 'right' }}>
					<BooleanInput source="active" defaultValue={true} />
				</Box>

				<Box
					display={'grid'}
					gridTemplateColumns={'110px 1fr 4fr'}
					gap={'1rem'}
					width={'100%'}
				>
					<NumberInput source="sequence" fullWidth defaultValue={99} step={1} />
					<TextInput source="context" fullWidth />
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
		</Create>
	);
};
