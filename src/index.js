import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { restorePortal, restoreSession } from './utils/session';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
const previousSession = restoreSession();
const previousPortal = restorePortal()

const theme = createTheme({
    typography: {
      fontFamily: 'Plus Jakarta Sans, sans-serif;', // Replace 'YourPreferredFont' with your chosen font family
    },
  });

root.render(
    <ThemeProvider theme={theme}>
        <App previousSession={previousSession} previousPortal={previousPortal}/>

    </ThemeProvider>

);

serviceWorker.unregister();
