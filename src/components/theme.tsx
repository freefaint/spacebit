import React, { PropsWithChildren, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';

export const SpaceBitTheme = ({ color, ...rest }: PropsWithChildren<{ color: string, children: React.ReactNode | React.ReactNode[] }>) => {
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: color
      }
    },
  
    overrides: {
      MuiButton: {
        text: {
          letterSpacing: "1.35px",
          fontSize: "0.9375rem",
          lineHeight: "1.5rem",
        },
  
        contained: {
          boxShadow: "none !important"
        },
      },
  
      MuiTooltip: {
        tooltip: {
          fontSize: "0.875rem",
          backgroundColor: "rgba(0, 0, 0, 0.87)"
        }
      },
  
      MuiFormHelperText: {
        root: {
          marginBottom: "-1.25rem",
        }
      },
  
      // Style sheet name ⚛️
      MuiInputBase: {
        inputMultiline: {
          minHeight: "4rem"
        },
      },
  
      MuiOutlinedInput: {
        input: {
          padding: "14.5px 14px",
  
          '&.Mui-disabled.readOnly': {
            color: 'rgba(0, 0, 0, 1) !important',
          }
        }
      },
  
      MuiInputLabel: {
        outlined: {
          transform: "translate(14px, 16px) scale(1)",
          color: "rgba(0, 0, 0, 0.54) !important",
        }
      },
  
      MuiFormControlLabel: {
        label: {
          color: "rgba(0, 0, 0, 0.54) !important",
        },
      },
  
      MuiInputAdornment: {
        positionEnd: {
          transform: "translateX(1rem)",
        }
      }
    },
  
    props: {
      MuiTextField: {
        variant: "outlined",
      },
    }
  }), [color]);

  return <ThemeProvider theme={theme} {...rest} />;
}
