import type { FC } from 'react';
import { AppBar } from '@mui/material';
import { TranslationLanguageSelector } from '../../features/translation-language-selector/ui';

export const Header: FC = () => {
  return (
    <AppBar>
      <TranslationLanguageSelector />
    </AppBar>
  );
};
