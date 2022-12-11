import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import zhTW from 'antd-mobile/es/locales/zh-TW'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if(window.location.href.indexOf('https://') != -1){
  localStorage.setItem('apiUrl', 'https://'+window.location.host);
}else{
  localStorage.setItem('apiUrl', 'http://'+window.location.host);
}

function selectLanguage(){
  let language1 = navigator.language
  if(language1 == "zh-CN"){
    return "zh-CN"
  }
  if(language1 == "zh-TW"){
    return "zh-TW"
  }
  if(language1 == "zh-HK"){
    return "zh-TW"
  }
  if(language1 == "zh-MO"){
    return "zh-TW"
  }
  if(language1 == "zh-SG"){
    return "zh-TW"
  }
  let language2 = navigator.language.slice(0,2)
  if(language2 == 'zh'){
    return "zh-CN"
  }
  if(language2 == 'en'){
    return "en-US"
  }
  if(language2 == 'ja'){
    return "ja-JP"
  }
  if(language2 == 'vi'){
    return "vi-VN"
  }
  return "en-US"
}
let navigatorLanguage = selectLanguage()
console.log(navigator.language)
// alert(navigator.language)
if(!localStorage.getItem('language')){
    localStorage.setItem('language',navigatorLanguage)
}
let locale = enUS
if(navigatorLanguage == 'zh-CN'){
  locale=zhCN
}else if(navigatorLanguage == 'zh-TW'){
  locale=zhTW
}
// localStorage.setItem('apiUrl', 'http://192.168.1.188');
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
    </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
