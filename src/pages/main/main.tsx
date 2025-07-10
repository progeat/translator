import type { FC } from 'react';
import { Box, Typography } from '@mui/material';

export const Main: FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography>
        React components receive data and return what should appear on the
        screen. You can pass them new data in response to an interaction, like
        when the user types into an input. React will then update the screen to
        match the new data.
      </Typography>
    </Box>
  );
};
