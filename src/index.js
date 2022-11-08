import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import { CartProvider } from 'react-use-cart';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
