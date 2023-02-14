import React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import FuentePago from './FuentePago';
//import MenuFuentesPago from './MenuFuentesPago';
//import reportWebVitals from './reportWebVitals';
const root = ReactDOMClient.createRoot(document.getElementById('root'));
//import "./index.css";

root.render(
    <Router>
        <App />
    </Router>,
    //document.getElementById("root")
);

/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/