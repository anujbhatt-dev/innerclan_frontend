import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import ReactTooltip from "react-tooltip"

axios.defaults.baseURL=
 // "http://localhost:8082/api"
"http://innerclan-env.eba-zzm3m6qx.ap-south-1.elasticbeanstalk.com/api"
//"http://innerclantest-env.eba-3xcbvtbq.ap-south-1.elasticbeanstalk.com/api"
// http://innerclantest-env.eba-3xcbvtbq.ap-south-1.elasticbeanstalk.com/api
//let authorization;


ReactDOM.render(
  <React.StrictMode>
    <App /><ReactTooltip />
  </React.StrictMode>,
  document.getElementById('root')
);
