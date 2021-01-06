 import React, {Component} from "react"
import {Link} from "react-router-dom"

 class Profile extends Component{

   render(){

     return (
       <div onClick={this.props.clicked} className="cart profile">
            {!this.props.authenticated?<label onClick={this.props.modalProfileHandler} htmlFor="cart__checkbox" className="cart__label"><i className="fa fa-user cart__icon" aria-hidden="true"></i></label>: <Link to="/myOrders"><label onClick={this.props.modalProfileHandler} htmlFor="cart__checkbox" className="cart__label"><i className="fa fa-user cart__icon" aria-hidden="true"></i></label></Link>}
        </div>
     )
   }
 }


export default Profile;
