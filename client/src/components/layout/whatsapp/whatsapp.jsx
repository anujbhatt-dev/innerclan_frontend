import React, {Component} from "react"
import ReactWhatsapp from 'react-whatsapp';

 class Whatsapp extends Component{

   componentDidMount=()=>{

   }


   render(){
    const message = "Hello Innerclan. I am interested to know about your product.Thank you"

     return (

             <ReactWhatsapp element="div" number="+919650415827" message={message} >
             <div id="WAButton" className="whatsapp">
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
             </div>
             </ReactWhatsapp>
     )
   }
 }


export default Whatsapp;
