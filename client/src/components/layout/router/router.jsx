import React, {Component} from "react"
import {NavLink} from "react-router-dom"

  class Router extends Component{

    render(){

      return (
         <div className="routes">
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/" className="routes__route">home</NavLink>
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/sustainibility" className="routes__route">sustainibility</NavLink>
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/customise" className="routes__route">customise</NavLink>
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/aboutUs" className="routes__route">about us</NavLink>
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/showcase" className="routes__route">Showcase</NavLink>
             <NavLink activeStyle={{color:"#80ea6e"}} exact to="/collection" className="routes__route">collection</NavLink>
             <span style={{zIndex:"500"}} data-aos-once="true" data-aos="fade-down" className="nav__list--item">contact us
             <span   className="dropdown">
                 <span style={{width:"18rem"}} className="dropdown__item">gmail@gmail.com</span>
                 <span style={{width:"18rem"}} className="dropdown__item">123456789</span>
                 <span style={{width:"18rem"}} className="dropdown__item instagram"><i className="fa fa-instagram" aria-hidden="true"></i></span>
             </span></span>
         </div>
      )
    }
  }


 export default Router;
