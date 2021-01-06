 import React, {Component} from "react"
import logo from "../../../assets/images/innerclan_page-0001.jpg"

 class SocialMedia extends Component{

   render(){

     return (
       <div id="links" className="links">
         <img onClick={this.imageClickHandler} className="nav__image" src={logo} alt="logo"/>
         <div>
           {(this.props.userDetail)?<span style={{margin:"0 auto"}} className="nav__list--item  nav__list--item-modifier">{"Welcome "+this.props.userDetail.firstName}</span>:(this.props.name!=="")?<span style={{margin:"0 auto"}} className="nav__list--item  nav__list--item-modifier">{"Welcome "+this.props.name}</span>:null}
           {this.props.authenticated?<span onClick={this.props.logout} style={{margin:"0 auto",padding:"1rem .5rem",width:"10rem"}} className="nav__list--item  nav__list--item-modifier">logout</span>:null}
         </div>
          <ul className="links__list">
             <span className="links__list-item links__list-item--modifier calluson" ><a href="tel://+918517885555"><i style={{color:"#25D366"}} id="call" className="call fa fa-phone" aria-hidden="true"></i></a></span>
             <span className="links__list-item links__list-item--modifier"><a target="_blank" rel="noopener noreferrer"  href="https://www.instagram.com/innerclanofficial/?igshid=gpgcb833gqme">{""}<i className="fa fa-instagram" aria-hidden="true"></i></a></span>
             <span className="links__list-item links__list-item--modifier"><a target="_blank" rel="noopener noreferrer"  href="https://www.instagram.com/innerclanofficial/?igshid=gpgcb833gqme">{""}<i className="fa fa-facebook" aria-hidden="true"></i></a></span>
             <span className="links__list-item links__list-item--modifier"><a target="_blank" rel="noopener noreferrer"  href="https://www.instagram.com/innerclanofficial/?igshid=gpgcb833gqme">{""}<i className="fa fa-twitter" aria-hidden="true"></i></a></span>
          </ul>
       </div>
     )
   }
 }


export default SocialMedia;
