import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// if(window.location.href.indexOf('https://') != -1){
//   localStorage.setItem('apiUrl', 'https://'+window.location.host);
// }else{
//   localStorage.setItem('apiUrl', 'http://'+window.location.host);
// }
localStorage.setItem('apiUrl', 'https://24gtnkschn.xyz');
// localStorage.setItem('apiUrl', 'http://192.168.1.188');
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
