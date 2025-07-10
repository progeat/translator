import type { PropsWithChildren } from 'react';
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { globalStyles, theme } from '../../../shared/mui';

export const MuiProvider = ({ children }: PropsWithChildren) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>
        <GlobalStyles styles={globalStyles} />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
