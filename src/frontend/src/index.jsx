import React from "react";
import ReactDOM from  "react-dom/client";
import { ToastContainer } from "react-toastify";
import  { Contract } from "./utils/icp";

import App from "./App";
import "./index.css";


import { Provider } from 'react-redux';
import store from '../src/Redux/store/store';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file




window.renderICPromise = Contract().then(()=>{
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
        <Provider store={store}>
           <App/>
           <ToastContainer hideProgressBar/>
        </Provider>
        </React.StrictMode>
    );
}).catch(console.error);