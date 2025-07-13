import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();
  const languaged = i18n.language;

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ width: '70px' }}>
      <FormControl fullWidth>
        <Select value={languaged} onChange={handleChange}>
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'ru'}>RU</MenuItem>
          <MenuItem value={'fr'}>FR</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
