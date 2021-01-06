import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss"
import Layout from "./components/layout/layout"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import axios from "axios"
import ForgotPassword from './components/layout/forgot-password/forgot-password';
import OAuthAuthorization from './components/layout/oauth-authorization/oauth-authorization';
import PaymentResult from './components/layout/payment-result/payment-result';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./error-boundry/error-boundry"

toast.configure()

axios.interceptors.response.use(response =>{
 // console.log("intercept->"+JSON.stringify(response.headers));
  let authorization=response.headers.authorization;
  if(authorization){
  axios.defaults.headers.common['authorization'] = authorization;
}
  return response;});


class App extends React.Component{


state={
  authenticated:false,
  name:"",
  email:"",
}

componentDidUpdate(){

  // if(this.state.authenticated===false)
  // if(this.getCookie("jwt")!==null)
  // {
  //   alert("jwt present")
  //   axios.defaults.headers.common['authorization'] = this.getCookie("jwt");
  // this.setState({authenticated:true});

  //      }
}

 getCookie=(value)=> {

   let cookies= document.cookie+";";

   if(cookies.indexOf(value)<0)
   return null;

  return cookies.substring(cookies.indexOf(value)+(value.length+1),cookies.indexOf(";",cookies.indexOf(value)+1));

}

componentDidMount=()=>{


  if(this.getCookie("jwt")!==null)
  {
    axios.defaults.headers.common['authorization'] = this.getCookie("jwt");
  this.setState({authenticated:true});

}

  axios.interceptors.response.use(response =>{
    let authorization=response.headers.authorization;

    if(authorization){
    axios.defaults.headers.common['authorization'] = authorization;
    let expire = 'expires='+this.getExpireTime();

    document.cookie=`jwt=${authorization}; path=/; ${expire}`;
    console.log(this.getCookie("jwt")===authorization)
  this.setState({authenticated:true});
  }

    return response;});
}

getExpireTime=()=>{
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000*36000;
  now.setTime(expireTime);
  return now.toGMTString();
}



setAuthorizationHeader=(jwt,email,name)=>{
  axios.defaults.headers.common['authorization'] = jwt
  let expire = 'expires='+this.getExpireTime();
  document.cookie=`name=${name}; path=/; ${expire}`;
  document.cookie=`jwt=${jwt}; path=/; ${expire}`;
  document.cookie=`email=${email}; path=/; ${expire}`;;
  this.setState({authenticated:true,name:name,email:email});
}


 deleteCookie=(name) =>{
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

logoutHandler=()=>{

  this.deleteCookie("name");
  this.deleteCookie("email");
  this.deleteCookie("jwt");

  window.location.href="http://sheltered-scrubland-77233.herokuapp.com/";
}

render(){





  return (
    <BrowserRouter>
      <ErrorBoundary>
            <Switch>
                    <Route exact path="/forgotPassword/:id"><ForgotPassword/></Route>
                    <Route exact path="/auth/:jwt/:email/:name"><OAuthAuthorization setAuthorizationHeader={this.setAuthorizationHeader}/></Route>
                    <Route exact path="/paymentResult/:jwt/:email/:name"><PaymentResult setAuthorizationHeader={this.setAuthorizationHeader}/></Route>

                    <Route>  <Layout setAuthorizationHeader={this.setAuthorizationHeader} logout={this.logoutHandler} name={this.state.name} email={this.state.email} authenticated={this.state.authenticated}/>
            </Route>
            </Switch>
        </ErrorBoundary>
    </BrowserRouter>
  );
}
}

export default App;
