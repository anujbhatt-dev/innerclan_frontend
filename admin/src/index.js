import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import ReactTooltip from "react-tooltip"

axios.defaults.baseURL=
// "http://localhost:8082/api"
"http://innerclan-env.eba-zzm3m6qx.ap-south-1.elasticbeanstalk.com/api"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
