import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';
import ContextProvider from './components/context/contexProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>


  </React.StrictMode>
);


// reportWebVitals();
