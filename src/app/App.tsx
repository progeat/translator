import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './providers';
import { AppRouter } from './router';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Suspense fallback="">
          <AppRouter />
        </Suspense>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
