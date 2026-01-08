import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';

import '@/index.css';



let app = <App />;
if (__STRICT_MODE__)
  app = (
    <StrictMode>
    {app}
    </StrictMode>
  );

createRoot(document.getElementById('root')!).render(app);
