import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { restoreSession } from './utils/session';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
const previousSession = restoreSession();

root.render(
  <Router>
    <App previousSession={previousSession} />
    </Router>,

);

serviceWorker.unregister();
