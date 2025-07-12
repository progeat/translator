import React from 'react';
import {
  Select,
  MenuItem,
  IconButton,
  Stack,
  type SelectChangeEvent,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import styles from './styles.module.css';
import { LANGUAGES } from '../../../entities/languages';
import type { LanguageCode } from '../../../entities/types/types';

interface LanguageSelectorProps {
  fromLang: LanguageCode;
  toLang: LanguageCode;
  onChange: (fromLang: LanguageCode, toLang: LanguageCode) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  fromLang,
  toLang,
  onChange,
  className,
}) => {
  const handleFromChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as LanguageCode, toLang);
  };

  const handleToChange = (e: SelectChangeEvent) => {
    onChange(fromLang, e.target.value as LanguageCode);
  };

  const swapLanguages = () => {
    onChange(toLang, fromLang);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} className={className}>
      <Select
        value={fromLang}
        onChange={handleFromChange}
        size="small"
        className={styles.select}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={`from-${lang.code}`} value={lang.code}>
            <span className={styles.flag}>{lang.icon}</span>
            {lang.name}
          </MenuItem>
        ))}
      </Select>

      <IconButton onClick={swapLanguages} size="small" className={styles.swapBtn}>
        <SwapVertIcon fontSize="small" />
      </IconButton>

      <Select
        value={toLang}
        onChange={handleToChange}
        size="small"
        className={styles.select}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={`to-${lang.code}`}
            value={lang.code}
            disabled={lang.code === fromLang}
          >
            <span className={styles.flag}>{lang.icon}</span>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};