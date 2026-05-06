import { RoleList } from './RoleList';

export const roles = (permissions?: string[]) => {
	if (!permissions) return null;

	const roles = {
		list: RoleList,
	};

	return permissions.includes('ADMIN') ? roles : null;
};
