import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SecondaryNavigation from "../secondary-nav/secondary-nav"
import Footer from "../footer/footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPassword extends Component {


    state={
        uuid:null,
        email:null,
       password:null,
       confirmPassword:null,
    }


    componentDidMount=()=>{

        console.log(this.props);

        this.setState({
            uuid:this.props.match.params.id,
        })    }


    onChangeHandler=(e)=>{

        let name=e.target.name;
        let value=e.target.value;

        this.setState({
            [name]:value,
        })

    }

    onSubmitHandler=(e)=>{

       // this.props.history.push("/");

       console.log(this.state)

        axios.post("/v1/client/forgotPassword",null,{params:this.state})
        .then((res)=>{
              this.props.history.push("/");
        })
        .catch(err=>{
          if(err.response && err.response.data[0]){
            toast.error(err.response.data[0]);
          }else{
            toast.error("something went wrong");
          }
        })
         e.preventDefault();
    }

    render() {
        return (
          <>
            <SecondaryNavigation />
            <form onSubmit={this.onSubmitHandler} style={{position:"static"}} className="customDesign__form">
              <h1 className="customDesign__form--head">Change your password</h1>
              <input required className="customDesign__form--input" onChange={this.onChangeHandler}   value={this.state.email} type="email" name="email" placeholder="email"/>
              <input required className="customDesign__form--input" onChange={this.onChangeHandler}   value={this.state.password} type="password" name="password" placeholder="new password"/>
              <input required className="customDesign__form--input" onChange={this.onChangeHandler}   value={this.state.confirmPassword} type="password" name="confirmPassword" placeholder="confirm password"/>
              <button className="customDesign__form--btn">Save</button>
            </form>
            <Footer />
        </>
        )
    }
}


export default  withRouter(ForgotPassword);
