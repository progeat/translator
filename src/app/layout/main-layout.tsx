import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from '../../widgets/header';

export const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: '70px 20px' }}>
        <Outlet />
      </Box>
    </>
  );
};
