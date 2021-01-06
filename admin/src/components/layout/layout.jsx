 import React, {Component} from "react"
import Sidebar from "../../UI/sidebar/sidebar"
import Main from "./main/main"
import logo from "../../assets/images/innerclan_page-0001.jpg"
import {Link} from "react-router-dom"

 class Layout extends Component{
     state={
       sidebar:true
     }

   render(){


     return (
        <div className="layout">
          {this.props.authenticated?<Sidebar>
               <div className="nav">
                    <img className="nav__image" src={logo} alt="logo"/>
                    <ul className="nav__list">
                         <Link to="/orders"><li className="nav__list--item">orders</li></Link>
                         <Link to="/products"><li className="nav__list--item">Products</li></Link>
                         <Link to="/categories"><li className="nav__list--item">Categories</li></Link>
                         <Link to="/addProduct"><li className="nav__list--item">Add product</li></Link>
                         <Link to="/addCategory"><li className="nav__list--item">add category</li></Link>
                         <Link to="/subscribe"><li className="nav__list--item">subscribe</li></Link>
                         <Link to="/designs"><li className="nav__list--item">designs</li></Link>
                         <Link to="/promo"><li className="nav__list--item">promo</li></Link>
                         <Link to="/clientui"><li className="nav__list--item">client ui</li></Link>
                         <Link to="/clients"><li className="nav__list--item">clients</li></Link>
                         <Link to="/showcase"><li className="nav__list--item">showcase</li></Link>

                         <li onClick={this.props.logout} className="nav__list--item">logout</li>
                    </ul>
               </div>
          </Sidebar>:null}
          <Main authenticated={this.props.authenticated}>

          </Main>
        </div>
     )
   }
 }


export default Layout;
