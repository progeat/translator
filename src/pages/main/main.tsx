import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { TextSelection } from '../../features/text-selection';

export const Main: FC = () => {
  const { t } = useTranslation('main');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        width: '800px',
      }}
    >
      <TextSelection />
      <Typography>{t('main text')}</Typography>
    </Box>
  );
};
