 import React, {Component} from "react"
import Orders from "./orders/orders"
import Products from "./products/products"
import Categories from "./categories/categories"
import AddProduct from "./add-product/add-product"
import AddCategory from "./add-category/add-category"
import UpdateCategory from "./categories/update-category/update-category"
import UpdateProduct from "./products/update-product/update-product"
import Subscribe from "./subscribe/subscribe"
import Promo from "./promo/promo"
import Designs from "./designs/designs"
import {Route , Switch} from "react-router-dom"
import ClientSideUI from "./client-side-ui/client-side-ui"
import Clients from "./clients/clients"
import Login from "../../login/login"
import Landing from "./landing/landing"
import Showcase from "./showcase/showcase"

 class Main extends Component{

   render(){
     let address="http://agile-reaches-60412.herokuapp.com/Login"

     return (
         <div className="main">
              <Switch>
                  <Route exact path="/"><Landing /></Route>
                  <Route exact path="/login"><Login address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/orders"><Orders address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/products"><Products address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/categories"><Categories address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/addProduct"><AddProduct address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/addCategory"><AddCategory address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/updateCategory"><UpdateCategory address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/updateProduct"><UpdateProduct address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/subscribe"><Subscribe address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/promo"><Promo address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/designs"><Designs address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/clientui"><ClientSideUI address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/clients"><Clients address={address} authenticated={this.props.authenticated}/></Route>
                  <Route exact path="/showcase"><Showcase address={address} authenticated={this.props.authenticated}/></Route>
              </Switch>
         </div>
     )
   }
 }


export default Main;
