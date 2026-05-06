import type { SxProps, Theme } from '@mui/system';
import {
	IconButtonWithTooltip,
	useResourceContext,
	useTranslate,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';

const commonListCSS = {
	borderRadius: '8px',
	padding: '3px 13px 3px 13px',
	'& .MuiSvgIcon-root': {
		fontSize: '18px',
	},
};

const CustomButtonToolTip = ({
	label,
	sx = commonListCSS,
	icon,
	action,
	id,
	resource: customResource,
	size,
	disabled,
	color,
}: {
	label: string;
	sx?: SxProps<Theme>;
	icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	action: 'show' | 'edit' | 'list' | 'redirect';
	id: string;
	resource?: string;
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean | undefined;
	color?:
		| 'inherit'
		| 'default'
		| 'primary'
		| 'secondary'
		| 'error'
		| 'info'
		| 'success'
		| 'warning';
}) => {
	const navigate = useNavigate();
	const translate = useTranslate();
	const resource = useResourceContext();

	async function redirectTo() {
		if (action === 'list') {
			navigate(`/${customResource ?? resource}/list`);
		} else if (action === 'redirect') {
			navigate(`/${customResource ?? resource}/${id}`);
		} else {
			navigate(`/${customResource ?? resource}/${id}/${action}`);
		}
	}

	return (
		<IconButtonWithTooltip
			color={color ? color : 'primary'}
			size={size ? size : 'medium'}
			sx={sx ? sx : {}}
			label={translate(label)}
			onClick={() => redirectTo()}
			disabled={disabled ? disabled : false}
		>
			{icon ? icon : null}
		</IconButtonWithTooltip>
	);
};

export default CustomButtonToolTip;
