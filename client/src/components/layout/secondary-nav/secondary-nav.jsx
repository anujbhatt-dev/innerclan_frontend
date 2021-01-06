 import React, {Component} from "react"
import logo from "../../../assets/images/innerclan_page-0001.jpg"
import {Link} from "react-router-dom"

 class SecondaryNavigation extends Component{

   render(){

     return (
        <nav id="scroll" className="secondaryNavigation">
            <Link to="/"><img src={logo} alt="logo"/></Link>
        </nav>
     )
   }
 }


export default SecondaryNavigation;
