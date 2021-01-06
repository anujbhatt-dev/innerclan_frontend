import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SecondaryNavigation from "../secondary-nav/secondary-nav"
import Footer from "../footer/footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPasswordIntermediate extends Component {


    state={
        email:null,
        flag:0
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
       this.setState({flag:3})
        axios.get("/v1/client/forgotPassword",{params:this.state})
        .then((res)=>{
              this.setState({flag:1})
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
              <h1 className="customDesign__form--head">we will send you an email</h1>
              <input required className="customDesign__form--input" onChange={this.onChangeHandler}   value={this.state.email} type="email" name="email" placeholder="email"/>
              <button className="customDesign__form--btn">{this.state.flag===1?"Resend":this.state.flag===3?"sending...":"Send"}</button>
              {this.state.flag===1?<h6 style={{display:"inline-block",fontSize:"1.5rem",padding:"1rem 1rem"}}>check your mail</h6>:null}
            </form>
            <Footer />
        </>
        )
    }
}


export default  withRouter(ForgotPasswordIntermediate);
