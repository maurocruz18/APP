import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

declare module '@mui/material/styles' {
	interface Theme {
		sidebar: {
			width: number;
			closedWidth: number;
		};
		primary: {
			light: string;
			main: string;
			dark: string;
			contrastText: string;
		};
	}
	interface ThemeOptions {
		sidebar?: {
			width?: number;
			closedWidth?: number;
		};
		primary?: {
			light: string;
			main: string;
			dark: string;
			contrastText: string;
		};
	}
	interface PaletteOptions {
		customElements: {
			actions: {
				main: string;
			};
		};
	}
	interface Palette {
		customElements: {
			actions: {
				main: string;
			};
		};
	}
}

const themes = {
	light: lightTheme,
	dark: darkTheme,
};

export default themes;
