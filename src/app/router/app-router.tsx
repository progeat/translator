import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/main';
import { AppRoutes } from '../../shared/config/routes';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.MAIN} element={<Main />} />
    </Routes>
  );
};
