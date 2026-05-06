import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'mmn.base.app',
	appName: 'Aplicação Base',
	webDir: 'dist',
	plugins: {
		EdgeToEdge: {
			backgroundColor: '#ffffff',
			navigationBarColor: '#000000',
			statusBarColor: '#ffffff',
		},
	},
};

export default config;
