import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import type { LanguageCode } from './model/types';
import { DEFAULT_SOURCE_LANG, DEFAULT_TARGET_LANG, LANGUAGES } from '../lib/constance';

export const TranslationLanguageSelector: FC = () => {
  const { i18n } = useTranslation();
  const [languagePair, setLanguagePair] = useState({
    source: DEFAULT_SOURCE_LANG,
    target: DEFAULT_TARGET_LANG,
  });

  useEffect(() => {
    i18n.changeLanguage(languagePair.source);
  }, [languagePair.source, i18n]);

  const handleSourceChange = (event: SelectChangeEvent<LanguageCode>) => {
    const newSource = event.target.value as LanguageCode;
    setLanguagePair(prev => ({
      source: newSource,
      target: newSource === prev.target ? findAlternativeTarget(newSource) : prev.target,
    }));
  };

  const handleTargetChange = (event: SelectChangeEvent<LanguageCode>) => {
    setLanguagePair(prev => ({
      ...prev,
      target: event.target.value as LanguageCode,
    }));
  };

  const swapLanguages = () => {
    setLanguagePair({
      source: languagePair.target,
      target: languagePair.source,
    });
  };

  const findAlternativeTarget = (sourceLang: LanguageCode): LanguageCode => {
    return LANGUAGES.find(lang => lang.code !== sourceLang)?.code || DEFAULT_TARGET_LANG;
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box>
        <FormControl size="small">
          <Select
            value={languagePair.source}
            onChange={handleSourceChange}
            renderValue={(value) => value.toUpperCase()}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem 
                key={`source-${lang.code}`} 
                value={lang.code}
                disabled={lang.code === languagePair.target}
              >
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <IconButton 
        onClick={swapLanguages}
        size="small"
        sx={{ alignSelf: 'flex-end', mb: 0.5 }}
      >
        <SwapHorizIcon fontSize="small" />
      </IconButton>

      <Box>
        <FormControl size="small">
          <Select
            value={languagePair.target}
            onChange={handleTargetChange}
            renderValue={(value) => value.toUpperCase()}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem 
                key={`target-${lang.code}`} 
                value={lang.code}
                disabled={lang.code === languagePair.source}
              >
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};