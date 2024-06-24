import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Root from './routes/root';
import Game from './routes/game.jsx';
import Results from './routes/results.jsx';
import { SettingsProvider } from './store/SettingsContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/results',
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </NextUIProvider>
  </React.StrictMode>
);
