import { defaultTheme } from 'react-admin';

const lightTheme = {
	...defaultTheme,
	palette: {
		primary: {
			light: '#009DCD',
			main: '#00B3E6',
			//onHover button
			dark: '#3E7692',
			contrastText: '#fff',
		},
		secondary: {
			main: '#fff',
		},
		success: {
			main: '#66bb6a',
		},
		warning: {
			main: '#ffa726',
		},
		error: {
			main: '#ef5350',
		},
		background: {
			default: '#ffffff',
			paper: '#f3f3f3',
		},
		customElements: {
			actions: {
				main: 'rgb(0, 179, 230, 0.7)',
			},
		},
		mode: 'light' as 'light',
	},
	shape: {
		borderRadius: 5,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	sidebar: {
		width: 250,
		closedWidth: 80,
		background: 'rgb(255, 255, 255)', //#fff
		borderRight: '1.5px dotted rgb(81, 84, 93, 0.5)',
	},
	typography: {
		fontFamily: 'Public Sans,sans-serif',
	},
	components: {
		RaDatagrid: {
			styleOverrides: {
				root: {
					'& .MuiToolbar-root:not(.RaBulkActionsToolbar-collapsed)': {
						minHeight: '31px',
						transform: 'translateY(0px)',
					},
					'& .MuiToolbar-root .RaBulkActionsToolbar-topToolbar': {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					},
					'& .RaBulkActionsToolbar-toolbar': {
						top: '-20px',
						maxHeight: '30px',
						minHeight: '30px',
					},
					'&.RaDatagrid-thead': {
						paddingTop: '300px',
					},
				},
			},
		},
		RaList: {
			styleOverrides: {
				root: {
					'.RaList-actions': {
						// backgroundColor: 'red',
						borderTop: '1px solid #0000001f',
						borderBottom: '1px solid #0000001f',
						paddingBottom: '10px',
					},
					'.RaList-content': {
						marginTop: '0 !important',
					},
					'.MuiCard-root': {
						marginTop: 0,
						border: 0,
						borderRadius: 0,
						boxShadow: 'none',
						background: 'transparent',
					},
					'& .MuiCardContent-root .MuiTypography-root': {
						color: 'black',
					},
					'& .MuiToolbar-root': {
						background: 'none',
						display: 'flex',
						flexWrap: 'nowrap',
						alignItems: 'center',
						justifyContent: 'center',
						'& form': {
							width: '100%',
						},
					},

					thead: {
						borderBottom: '1px solid #0000001f',
					},
					'& .MuiTableHead-root .MuiTableCell-root': {
						padding: '6px 16px !important',
					},
				},
			},
			defaultProps: {
				empty: false,
			},
		},
		RaEdit: {
			styleOverrides: {
				root: {
					'& .RaEdit-main': {
						gap: '20px',
						'@media (max-width:1200px)': {
							flexDirection: 'column !important',
						},
					},
					'& .RaEdit-card': {
						height: 'fit-content',
						width: '100%',
					},
					'& .RaEdit-main>div:not(.RaEdit-card) ': {
						width: '20%',
						'@media (max-width:1200px)': {
							width: '100%',
						},
					},
				},
			},
		},
		RaShow: {
			styleOverrides: {
				root: {
					'& .RaShow-main': {
						gap: '20px',
						'@media (max-width:1200px)': {
							flexDirection: 'column !important',
						},
					},
					'& .RaShow-card': {
						height: 'fit-content',
						width: '100%',
					},
					'& .RaShow-main>div:not(.RaShow-card) ': {
						width: '20%',
						'@media (max-width:1200px)': {
							width: '100%',
						},
					},
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					'& .MuiTableHead-root .MuiTableCell-root': {
						padding: '12px',
						background: 'none',
						fontWeight: '600',
						'& span': {
							textTransform: 'uppercase',
							color: '#009DCD',
							fontSize: '12px',
							fontWeight: 'normal',
						},
					},
					'& .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root': {
						//padding: '10px',
						/*'&:nth-of-type(odd)': {
                            backgroundColor: 'rgb(81, 84, 93, 0.13)',
                            '& .MuiTypography-root':{
                                color: 'black'
                            },
                        },
                        '&:hover:nth-of-type(odd)':{
                            backgroundColor: 'rgb(81, 84, 93, 0.05)',
                        }*/
					},
					'& .MuiTableBody-root .MuiTableRow-root': {
						transition: '200ms ease-out',
						'&:nth-of-type(even)': {
							backgroundColor: 'rgb(0, 0, 0, 0.02)',
						},
						'&:hover': {
							backgroundColor: 'rgb(81, 84, 93, 0.1)',
						},
					},
					// hide last border
					'&:last-child td, &:last-child th': {
						border: 0,
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					paddingBottom: '10px',
					paddingTop: '10px',
					fontColor: 'rgb(0, 179, 230, 0)',
					borderRadius: '5px',
					color: 'grey',
					'&.sidebar': {
						marginLeft: '5px',
						marginRight: '5px',
						marginTop: '5px',
						marginBottom: '5px',
					},
					'&.submenuItem': {
						marginTop: '3.5px',
						marginLeft: '5px',
						marginRight: '15px',
					},
					'&:hover': {
						background: 'rgb(0, 179, 230, 0.5)',
						color: 'white',
						'&.close': {
							color: 'transparent',
						},
						'&.open': {
							color: 'white',
						},
						transition: '0.3s',
						'& .MuiListItemIcon-root': {
							color: 'white',
						},
					},
					'&.RaMenuItemLink-active': {
						background: 'rgb(0, 179, 230, 0.7)',
						color: 'white !important',
						'&.close': {
							color: 'transparent',
						},
						'&.open': {
							color: 'white',
						},
						'& .MuiListItemIcon-root': {
							color: 'white',
						},
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				elevation1: {
					boxShadow: 'none',
				},
				root: {
					border: '1px solid #e0e0e3',
					backgroundClip: 'padding-box',
					'&.RaList-content': {
						marginTop: '14px',
					},
				},
			},
		},
		/*MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#fff',
                    color: '#4f3cc9',
                    boxShadow: 'none',
                },
            }
        },*/
		MuiButtonBase: {
			styleOverrides: {
				root: {
					'&:hover:active::after': {
						// recreate a static ripple color
						// use the currentColor to make it work both for outlined and contained buttons
						// but to dim the background without dimming the text,
						// put another element on top with a limited opacity
						content: '""',
						display: 'block',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						right: 0,
						backgroundColor: 'currentColor',
						opacity: 0.3,
						borderRadius: 'inherit',
						color: 'white',
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					border: 'none',
					color: 'grey',
					backgroundColor: 'transparent', //#fff
					height: '50px',
					justifyContent: 'center',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					background: '#fff',
					boxShadow:
						'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
					border: '1px solid rgb(230, 230, 230, 0.2)',
				},
			},
		},
		MuiLinearProgress: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: '#f5f5f5',
				},
				barColorPrimary: {
					backgroundColor: '#d7d7d7',
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgb(0, 0, 0, 0)',
					borderRadius: '5px',
					border: '1px solid rgb(145, 158, 171, 0.4)',
					'&$disabled': {
						backgroundColor: 'rgb(0, 0, 0, 0.04)',
					},
					'&:hover:not($disabled):before': {
						backgroundColor: 'rgb(0, 0, 0, 0)',
						border: '1px solid rgb(145, 158, 171)',
					},
				},
				underline: {
					//retirar bottom border default
					'&:before': {
						borderBottom: '1px solid rgba(255, 133, 51, 0)',
					},
					'&:after': {
						borderBottom: `1px solid #00B3E6`,
					},
					/*'&:hover:not($disabled):not($focused):not($error):before': {
                        borderBottom: `2px solid red`
                    } */
					'&:hover:before': {
						borderBottomColor: `rgba(255, 133, 51, 0) !important`,
					},
				},
			},
		},
		MuiSnackbarContent: {
			styleOverrides: {
				root: {
					border: 'none',
				},
			},
		},
		// Text Input pequenos e com a label sempre em cima
		MuiTextField: {
			styleOverrides: {
				root: {
					fieldset: {
						borderColor: '#0000001f',
					},
				},
			},
			defaultProps: {
				size: 'small',
				slotProps: {
					inputLabel: {
						shrink: true,
					},
				},
			},
		},
		RaSelectArrayInput: {
			styleOverrides: {
				root: {
					fieldset: {
						borderColor: '#0000001f',
					},
					'& .RaSelectArrayInput-chip': {
						borderRadius: '5px',
						backgroundColor: '#009DCD',
						color: 'white',
					},
					'& .MuiSelect-outlined': {
						minHeight: '1.75rem',
					},
				},
			},
			defaultProps: {
				size: 'small',
				InputLabelProps: {
					shrink: true,
				},
			},
		},
		RaCreateButton: {
			defaultProps: {
				startIcon: null,
				variant: 'contained',
			},
		},
		RaListButton: {
			defaultProps: {
				startIcon: null,
				variant: 'outlined',
			},
		},
		RaSaveButton: {
			defaultProps: {
				icon: null,
			},
		},
		RaDeleteWithConfirmButton: {
			defaultProps: {
				icon: null,
				variant: 'outlined',
				size: 'medium',
			},
		},
		// Ao criar, o default redirect é para a listagem. Para ir para a edição, alterar no componente
		RaCreate: {
			defaultProps: {
				redirect: 'list',
			},
		},
	},
	props: {
		MuiButtonBase: {
			// disable ripple for perf reasons
			disableRipple: true,
		},
		MuiTable: {
			size: 'large',
		},
	},
};

export default lightTheme;
