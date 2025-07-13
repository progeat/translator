import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './providers';
import { AppRouter } from './router';
import { StoreProvider } from './providers/store-provider';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Providers>
          <Suspense fallback="">
            <AppRouter />
          </Suspense>
        </Providers>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
