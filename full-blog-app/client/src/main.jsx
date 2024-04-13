import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import store from './Store/store.js';
import App from './App.jsx'
import './index.css'
import React from 'react';
import { Provider } from 'react-redux';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <BrowserRouter>
    <App  />
  </BrowserRouter>

  </Provider>
)
