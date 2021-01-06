 import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import axios from "axios"

 class Login extends Component{


   state={
     // cart:[],
     // show:false,
     // userDetail:{},
     // profile:false,
     register:{
       firstName:"",
       lastName:"",
       username:"",
       secret:"",
       confirmsecret:""
     },
     login:{
       username:"",
       secret:"",
     },
     loading:false
  }

  

   logInSubmitHandler=(e)=>{
     axios.post("/v1/admin/authenticate",null,{params:this.state.login}).then(res=>{
        this.setState({
          // authenticated:true,
          login:{
            username:"",
            secret:"",
          },
          show:false,
          profile:false,
          userDetail:{...res.data}
        })
     }).catch(err=>{
       if(err.response && err.response.data[0]){
         alert(err.response.data[0]);
       }else{
         alert("something went wrong search");
       }
     })

     e.preventDefault();
   }

   logInChangeHandler=(e)=>{
       let newLogin = {...this.state.login}
       newLogin[e.target.name]= e.target.value
       this.setState({login:{...newLogin}})
   }

   registerChangeHandler=(e)=>{
     let newRegister = {...this.state.register}
     newRegister[e.target.name]= e.target.value
     this.setState({register:{...newRegister}})
   }


   componentDidUpdate=(prevProps,prevState)=>{
     if(!prevProps.authenticated && this.props.authenticated){
       this.props.history.push("/orders")
     }
   }

   render(){

     return (
       <div className="user">
                            <hr/>
                            <form className="user__login" onSubmit={this.logInSubmitHandler}>
                                 <h3>logIn</h3>
                                 <input onChange={this.logInChangeHandler}  value={this.state.login.username} required placeholder="username" className="user__input" name="username" type="text"/>
                                 <input onChange={this.logInChangeHandler}  value={this.state.login.secret} required placeholder="secret" className="user__input" name="secret" type="secret"/>
                                 <button className="user__login--btn" type="submit">login</button>
                                 <Link to="/forgotsecret"><p className="user__login--forgotsecret">Forgot secret?</p></Link>
                            </form>
                            <hr/>
                            
        </div>
     )
   }
 }


export default withRouter(Login);
