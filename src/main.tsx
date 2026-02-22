import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('test-deploy', import.meta.env);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        test
        {/*<App />*/}
    </StrictMode>
);
