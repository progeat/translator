import { type PropsWithChildren } from 'react';
import { MuiProvider } from './mui';

export const Providers = ({ children }: PropsWithChildren) => {
  return <MuiProvider>{children}</MuiProvider>;
};
