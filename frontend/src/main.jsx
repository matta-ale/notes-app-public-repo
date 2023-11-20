// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {store} from '../src/redux/store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import axios from 'axios'
const { VITE_BACKEND_URL } = import.meta.env;


axios.defaults.baseURL= VITE_BACKEND_URL

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
