 import React, {Component} from "react"
import {Link} from "react-router-dom"

 class Landing extends Component{

   render(){


     return (
        <div className="landing">
           <Link to="/Login">
               <button className="landing__getStarted">get started</button>
           </Link>
        </div>
     )
   }
 }


export default Landing;
