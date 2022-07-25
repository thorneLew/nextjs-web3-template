import { ThemeOptions } from "@mui/material";

export type mode = 'drak' | 'light'
interface Option {
  mode?: mode
}

function getDrakPalette ():ThemeOptions['palette']  {
  return {
    primary: {
      main: '#034400',
    },
    secondary: {
      main: '#900'
    },
    success: {
      main: '#080'
    },
    error: {
      main: '#000'
    }
  }
}

function getComponents (): ThemeOptions['components'] {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        containedPrimary: {
          background: 'linear-gradient(141deg,#26afe6 1%, #fe3dce 100%)',
          borderRadius: '8px',
          boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.08)',
          '&.Mui-disabled': {
            opacity: 0.3,
            color: '#fff'
          }
        },
        outlinedPrimary: {
          border: '1px solid #ffffff',
          borderRadius: '8px',
          '&:hover':{
            border: '1px solid #ffffff',
          }
          // boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.50)'
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#05121c',
          color: "#fff"
        },
      }
    },   
     MuiContainer:{
      styleOverrides:{
        root:{
          paddingLeft:0,
          paddingRight:0, 
          '&.MuiContainer-maxWidthLg':{
            paddingLeft:0,
            paddingRight:0, 
          }
        },

      }

    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
          textTransform: 'capitalize',
        }
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          boxShadow:'none',
          '&:hover':{
            boxShadow: "0px 0px 24px 5px rgba(0,0,0,0.2), 0px 0px 24px 5px rgba(0,0,0,0.2)",
          }
        }
      }
    }
  }
}

export function getTheme ({mode}: Option): ThemeOptions {
  return {
    palette: mode === 'drak' ? getDrakPalette() : {},
    components: getComponents(),
    typography: {
      fontFamily: 'PingFangSC, PingFangSC-Medium',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1350,
        xl: 1536,
      },
    },
  }
  
}