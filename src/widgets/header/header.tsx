import type { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { TranslationLanguageSelector } from '../../features/translation-language-selector/ui';


export const Header: FC = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        <TranslationLanguageSelector />
      </Toolbar>
    </AppBar>
  );
};
