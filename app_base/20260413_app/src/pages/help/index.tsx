import { HelpCreate } from './HelpCreate';
import { HelpEdit } from './HelpEdit';
import { HelpList } from './HelpList';

export const help = (permissions?: string[]) => {
	if (!permissions) return null;

	const help = {
		list: HelpList,
		create: HelpCreate,
		edit: HelpEdit,
	};

	return permissions.includes('ADMIN') ? help : null;
};
