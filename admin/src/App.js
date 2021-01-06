import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom"
import "./App.scss"
import Layout from "./components/layout/layout"
import Login from "./components/login/login"
import ReactTooltip from "react-tooltip"
import axios from "axios"

class App extends React.Component{

  state={
  authenticated:false,
  name:"",
  email:"",
}

componentDidUpdate=()=>{
  // console.log("APP.jsx updated--> "+ JSON.stringify(this.state));
}

componentDidMount=()=>{
  axios.interceptors.response.use(response =>{
    let authorization=response.headers.authorization;
    if(authorization && response.headers.key){
    axios.defaults.headers.common['authorization'] = authorization;
    axios.defaults.headers.common['key'] = response.headers.key;
  this.setState({authenticated:true,name:response.headers.name,email:response.headers.email});
  }

    return response;});
}




logoutHandler=()=>{
  if(window.confirm("are you sure?")){
    this.setState({authenticated:false})
  }
}

  render(){




        return (
          <BrowserRouter>
                 <Layout logout={this.logoutHandler} authenticated={this.state.authenticated}/><ReactTooltip />
          </BrowserRouter>
        );
  }
}

export default App;
