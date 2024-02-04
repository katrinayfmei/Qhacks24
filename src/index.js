import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './Header'
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
      domain="liambeenken.us.auth0.com"
      clientId="4jvTtEcUsVpYhjVO8UEBsp1btLl8g20b"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Header />
      <App />
    </Auth0Provider>,
  );
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
