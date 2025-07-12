import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/main';
import { AppRoutes } from '../../shared/config/routes';
import { MainLayout } from '../layout';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.MAIN} element={<MainLayout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};
