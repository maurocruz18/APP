//Este botão serve apenas para eliminar

import type { SxProps, Theme } from '@mui/system';
import { useState } from 'react';
import {
	Confirm,
	IconButtonWithTooltip,
	useDataProvider,
	useNotify,
	useRefresh,
	useResourceContext,
	useTranslate,
} from 'react-admin';

const commonListCSS = {
	borderRadius: '8px',
	padding: '3px 13px 3px 13px',
	'& .MuiSvgIcon-root': {
		fontSize: '18px',
	},
};

const itemDefaultMessages = {
	delete: {
		title: 'ra.message.delete_title',
		content: 'ra.message.delete_content',
	},
};

const CustomConfirmButtonToolTip = ({
	id,
	resource: customResource,
	label,
	sx = commonListCSS,
	icon,
	color,
	size,
	disabled,
	dialogueTitle,
	dialogueContent,
}: {
	id: string;
	resource?: string;
	label: string;
	sx?: SxProps<Theme>;
	icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	color?:
		| 'inherit'
		| 'default'
		| 'primary'
		| 'secondary'
		| 'error'
		| 'info'
		| 'success'
		| 'warning';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean | undefined;
	dialogueTitle?: string;
	dialogueContent?: string;
}) => {
	const translate = useTranslate();
	const [open, setOpen] = useState<boolean>(false);
	const dataProvider = useDataProvider();
	const refresh = useRefresh();
	const notify = useNotify();
	const resource = useResourceContext();

	const handleDialogOpen = (e: any) => {
		e.stopPropagation();
		setOpen(true);
	};

	const handleDialogClose = () => setOpen(false);

	const onConfirm = async () => {
		dataProvider
			.delete(customResource ?? resource ?? '', { id: id })
			.then(() => {
				notify('ra.notification.deleted', {
					type: 'info',
					messageArgs: { smart_count: 1 },
				});
				refresh();
			})
			.catch(() => {
				notify('ra.notification.deleted_error', { type: 'error' });
			});

		setOpen(false);
		//handleDialogClose();
	};

	return (
		<>
			<IconButtonWithTooltip
				color={color ? color : 'primary'}
				size={size ? size : 'medium'}
				sx={sx ? sx : {}}
				label={translate(label)}
				onClick={handleDialogOpen}
				disabled={disabled ? disabled : false}
			>
				{icon ? icon : null}
			</IconButtonWithTooltip>
			<Confirm
				isOpen={open}
				title={
					dialogueTitle
						? translate(dialogueTitle)
						: itemDefaultMessages.delete.title
				}
				content={
					dialogueContent
						? translate(dialogueContent)
						: itemDefaultMessages.delete.content
				}
				onConfirm={onConfirm}
				onClose={handleDialogClose}
			/>
		</>
	);
};

export default CustomConfirmButtonToolTip;
