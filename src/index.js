import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { restorePortal, restoreSession } from './utils/session';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
const previousSession = restoreSession();
const previousPortal = restorePortal()
root.render(
    <App previousSession={previousSession} previousPortal={previousPortal}/>

);

serviceWorker.unregister();
