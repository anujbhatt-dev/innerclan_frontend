 import React, {Component} from "react"
import Subscribe from "./subscribe/subscribe"
import innerclan from "../../../assets/images/innerclan_page-0001.jpg"
import {Link} from "react-router-dom"
import Aos from "aos"
import "aos/dist/aos.css"


 class Footer extends Component{



   componentDidMount=()=>{
     Aos.init({duration:2000,delay:500})
   }
   componentDidUpdate=()=>{
     Aos.init({duration:2000,delay:500})
   }






   render(){

     return (
       <>
            <Subscribe />
            <footer className="footer">
                   <div className="footer__d1"><img src={innerclan} alt=""/></div>
                   <div className="footer__d1 footer__d12 ">
                     <Link  data-aos-once="true" data-aos="fade-down" to="/sizeChart">size chart</Link>
                     <Link  data-aos-once="true" data-aos="fade-down" to="/privacyPolicy">privacy policy</Link>
                     <Link  data-aos-once="true" data-aos="fade-down" to="/deliveryAndReturn">dilevery and returns</Link>
                     <span  data-aos-once="true" data-aos="fade-down" className="nav__list--item">contact us
                     <span className="dropdown">
                         <span className="dropdown__item">gmail@gmail.com</span>
                         <span className="dropdown__item">123456789</span>
                         <span className="dropdown__item instagram"><i className="fa fa-instagram" aria-hidden="true"></i></span>
                     </span></span>
                     <Link  data-aos-once="true" data-aos="fade-down" to="/whoAreWe">who are we</Link>
                   </div>
                   <div className="footer__d1">copyright &copy; 2020 inner clan designs</div>
             </footer>
       </>
     )
   }
 }


export default Footer;
