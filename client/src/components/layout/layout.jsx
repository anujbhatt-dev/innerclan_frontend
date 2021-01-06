import React, {Component} from "react"
import SocialMedia from "./social-media/social-media"
import Footer from "./footer/footer"
import WhoAreWe from "./footer/who-are-we/who-are-we"
import SizeChart from "./footer/size-chart/size-chart"
import DeliveryAndReturn from "./footer/delivery-and-return/delivery-and-return"
import PrivacyPolicy from "./footer/privacy-policy/privacy-policy"
import Main from "./main/main"
import Cart from "./main/cart/cart"
import Profile from "./main/profile/profile"
import Modal from "../../UI/modal/modal"
import Modal2 from "../../UI/modal2/modal2"
import axios from "axios"
import Backdrop from "../../UI/backdrop/backdrop"
import Backdrop2 from "../../UI/backdrop2/backdrop2"
import {Route,Switch, Link} from  "react-router-dom"
import Checkout from "./checkout/checkout"
import MyOrders from "./my-order/my-order"
import ReactToolip from "react-tooltip"
import {withRouter} from "react-router-dom"
import ForgotPasswordIntermediate from "./forgot-password-intermediate/forgot-password-intermediate"
// import Navigation from "./main/navigation/navigation"
import SecondaryNavigation from "./secondary-nav/secondary-nav"
import Whatsapp from "./whatsapp/whatsapp"
import GoTOTop from "./goToTop/goToTop"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Showcase from "./showcase/showcase"
import Router from "./router/router"
import Contact from "./contact/contact"
import About from "./about/about"
import Sustain from "./sustain/sustain"
import CustomDesign from "./custom-design/custom-design"

 class Layout extends Component{

   state={
     cart:[],
     show:false,
     userDetail:null,
     profile:false,
     register:{
       firstName:"",
       lastName:"",
       email:"",
       password:"",
       confirmPassword:""
     },
     login:{
       email:"",
       password:"",
     },
     loading:false
  }


   registerSubmitHandler=(e)=>{
     if(this.state.register.password===this.state.register.confirmPassword){
       axios.post("/v1/client/register",this.state.register).then(res=>{
         this.setState({
           // authenticated:true,
           register:{
             firstName:"",
             lastName:"",
             email:"",
             password:"",
             confirmPassword:""
           },
           show:false,
           profile:false,
           userDetail:{...res.data}
         })
       }).catch(err=>{
         console.log(err.response);
         if(err.response && err.response.data[0]){
           toast.error(err.response.data[0]);
         }else{
           toast.error("something went wrong...!!!");
         }
       })
     }else{
       toast.error("password should match")
     }
     e.preventDefault();
   }

   logInSubmitHandler=(e)=>{

    console.log("Updating cookies")
     axios.post("/v1/client/authenticate",this.state.login).then(res=>{

      document.cookie=`name=${res.data.firstName}`;
      document.cookie=`email=${res.data.email}`;

        this.setState({
          // authenticated:true,
          login:{
            email:"",
            password:"",
          },
          show:false,
          profile:false,
          userDetail:{...res.data}
        })
     }).catch(err=>{

       if(err.response && err.response.data){
         toast.error(err.response.data);
       }else{
         toast.error("something went wrong search");
       }
     })
     e.preventDefault();
   }

   logInChangeHandler=(e)=>{
       let newLogin = {...this.state.login}
       newLogin[e.target.name]= e.target.value
       this.setState({login:{...newLogin}})
   }

   registerChangeHandler=(e)=>{
     let newRegister = {...this.state.register}
     newRegister[e.target.name]= e.target.value
     this.setState({register:{...newRegister}})
   }

   modalToggleHandler=()=>{
      if(this.state.show){
        this.setState({show:false})
      }else{
        this.setState({show:true})
      }
   }

   modalProfileHandler=()=>{
      if(this.state.profile){
        this.setState({profile:false})
      }else{
        this.setState({profile:true})
      }
   }

   cartHandler=(e)=>{
       if(!this.props.authenticated){
           this.setState({profile:true})
           return false
       }
      const newCartState=[...this.state.cart]
      newCartState.push(e)
      this.setState({cart:[...newCartState],
                     loading:true
                   })
   }

   getCookie=(value)=> {

    let cookies= document.cookie+";";

    if(cookies.indexOf(value)<0)
    return null;

   return cookies.substring(cookies.indexOf(value)+(value.length+1),cookies.indexOf(";",cookies.indexOf(value)+1));

 }

   componentDidMount=()=>{


     window.scrollTo({top:"0",behavior:"smooth"})

    if(this.getCookie("name")){ let userDetail= {};
     userDetail["firstName"]= this.getCookie("name");
     userDetail["email"]=this.getCookie("email");

     this.setState({userDetail:{...userDetail}})
     console.log(userDetail);
}
     if(this.props.authenticated){

       axios.get("/v1/client/cart").then(res=>{

         this.setState({cart:[...res.data]})
       }).catch(err=>{
          if(err.response && err.response.data[0]){
            toast.error(err.response.data[0]);
          }else{
            toast.error("something went wrong....!!!!");
          }
       })
     }
   }

   componentDidUpdate=(prevProps,prevState)=>{
     if(this.state.loading){
        let cartItem = {
          colorId:this.state.cart[this.state.cart.length-1].selectedColorId,
          size:this.state.cart[this.state.cart.length-1].size,
          quantity:this.state.cart[this.state.cart.length-1].quantity
        }
       axios.post("/v1/client/cart",cartItem).then(res=>{
         toast.info("added to cart",{
           className:"toast"
         });
         this.setState({loading:false})
       }).catch(err=>{
          this.setState({loading:false})
          if(err.response && err.response.data[0]){
            toast.error(err.response.data[0]);
          }else{
            toast.error("something went wrong....!!!!");
          }
       })
     }
   //
     if(this.props.authenticated && (prevState.cart.length===0) && !prevProps.authenticated){
       axios.get("/v1/client/cart").then(res=>{

         this.setState({cart:[...res.data]})
       }).catch(err=>{
          if(err.response && err.response.data[0]){
            toast.error(err.response.data[0]);
          }else{
            toast.error("something went wrong....!!!!");
          }
       })
     }
   }



   deleteProductFromCartHandler=(id,size,i)=>{
     let params={
       colorId:id,
       size:size
     }
      axios.delete("/v1/client/cart",{params:params}).then(res=>{
        let newCart = [...this.state.cart]
        newCart.splice(i,1);
        this.setState({cart:[...newCart]})
      }).catch(err=>{
        if(err.response && err.response.data[0]){
          toast.error(err.response.data[0]);
        }else{
          toast.error("something went wrong....!!!!");
        }
      })
   }


   quantityHandler=(operation,i)=>{
     let newCart = [...this.state.cart]
     if(operation==="minus" && this.state.cart[i].quantity>1){
       newCart[i].quantity=newCart[i].quantity-1
       this.setState({
          cart:[...newCart]
       })
     }else if(operation==="plus"){
       newCart[i].quantity=newCart[i].quantity+1
       this.setState({
          cart:[...newCart]
       })
     }
   }

   checkoutHandler=()=>{
      let checkout = this.state.cart.map((cartItem,i)=>{
        return {colorId:cartItem.selectedColorId,
                quantity:cartItem.quantity,
                size:cartItem.size}
      })
      axios.post("/v1/order/checkOut/",checkout).then(res=>{
      }).catch(err=>{
        if(err.response && err.response.data[0]){
          toast.error(err.response.data[0]);
        }else{
          toast.error("something went wrong....!!!!");
        }
      })
      this.setState({show:false})
      this.props.history.push("/checkout")
   }

   render(){

     let modal=null;
     let modalLogin=null;
     if(this.state.cart.length!==0){
       modal = this.props.authenticated?[<Modal key={"modal1"} clicked={this.modalToggleHandler} show={this.state.show}><div className="modalCart">
       <div className="modalCart__box modalCart__box--head">
           <div className="modalCart__box--col1">
               Products
           </div>
           <div className="modalCart__box--col2">
               <div className="modalCart__box--item">Price</div>
               <div className="modalCart__box--item">Quantity</div>
               <div className="modalCart__box--item">Total Price</div>
           </div>
       </div>
                  {this.state.cart.map((product,i)=>(
                    <div key={product.id+i} className="modalCart__box">
                        <img className="modalCart__box--item modalCart__box--img" src={product.selectedColorImage} alt=""/>
                        <div className="modalCart__box--col1">
                            <div data-tip={product.productName} className="modalCart__box--item modalCart__box--name">{(product.productName.length>25)?product.productName.slice(0,25):product.productName}{(product.productName.length>25)?"...":null}</div><ReactToolip/>
                            <div className="modalCart__box--item modalCart__box--size">{product.size}</div>
                            <div className="modalCart__box--item modalCart__box--color">{product.selectedColorName}</div>
                            <div onClick={()=>this.deleteProductFromCartHandler(product.selectedColorId,product.size,i)} className="modalCart__box--item modalCart__box--remove">remove</div>
                        </div>
                        <div className="modalCart__box--col2">
                            <div className="modalCart__box--item modalCart__box--productPrice">₹ {product.productPrice}</div>
                            <div className="modalCart__box--item modalCart__box--quantity"><span onClick={()=>this.quantityHandler("minus",i)}>-</span>{product.quantity}<span  onClick={()=>this.quantityHandler("plus",i)}>+</span></div>
                            <div className="modalCart__box--item modalCart__box--productPrice">₹ {product.productPrice * product.quantity}</div>
                        </div>
                    </div>
                  ))}
                  <div className="modalCart__box2">
                    <h5 className="modalCart__box2--h5">Grand Total{" "} <span>₹ {this.state.cart.map(product=>(product.quantity*product.productPrice)).reduce((acc,value)=>acc+value)}</span></h5>
                    <div onClick={this.checkoutHandler} className="modalCart__box2--checkout nav__list--item product__details--cart-btn">checkout</div>
                  </div>
               </div></Modal>,<Backdrop key={"backdrop1"} clicked={this.modalToggleHandler} show={this.state.show}/>]
               :[<Modal key={"modal1"} clicked={this.modalToggleHandler} show={this.state.show}>
                               <div className="user">
                                   <a href="http://innerclan-env.eba-zzm3m6qx.ap-south-1.elasticbeanstalk.com/oauth2/authorization/google" className="user__google"><i class="fa fa-google" aria-hidden="true"></i> Continue with Google </a>
                                   <hr/>
                                   <form className="user__login" onSubmit={this.logInSubmitHandler}>
                                        <h3>logIn</h3>
                                        <input value={this.state.login.email} onChange={this.logInChangeHandler} required placeholder="email or username" className="user__input" name="email" type="text"/>
                                        <input value={this.state.login.password} onChange={this.logInChangeHandler} required placeholder="password" className="user__input" name="password" type="password"/>
                                        <button className="user__login--btn" type="submit">login</button>
                                   </form>
                                   <hr/>
                                   <form className="user__register" onSubmit={this.registerSubmitHandler}>
                                        <h3>Register</h3>
                                        <div className="flex">
                                          <input  value={this.state.register.firstName} onChange={this.registerChangeHandler} required placeholder="firstname" className="user__input" name="firstName" data-tip="enter a your first name" type="text"/>
                                          <input value={this.state.register.lastName} onChange={this.registerChangeHandler} required placeholder="lastname" className="user__input" name="lastName" data-tip="enter a your last name" type="text"/>
                                        </div>
                                        <input value={this.state.register.email} onChange={this.registerChangeHandler} required placeholder="email" className="user__input" name="email" type="text"/>
                                        <input value={this.state.register.password} onChange={this.registerChangeHandler} required placeholder="password" className="user__input" name="password" type="password"/>
                                        <input value={this.state.register.confirmPassword} onChange={this.registerChangeHandler} required placeholder="confirm password" className="user__input" name="confirmPassword" type="password"/>
                                       <button className="user__register--btn" type="submit">sighup</button>
                                   </form>
                               </div>
                          </Modal>, <Backdrop key={"backdrop1"} clicked={this.modalToggleHandler} show={this.state.show}/>]
     }
     if(!this.props.authenticated){
       modalLogin = [<Modal2 key={"modal2"} clicked={this.modalProfileHandler} show={this.state.profile}>
                        <div className="user">
                            <a href="http://innerclan-env.eba-zzm3m6qx.ap-south-1.elasticbeanstalk.com/oauth2/authorization/google" className="user__google"><i className="fa fa-google" aria-hidden="true"></i> continue with google </a>
                            <hr/>
                            <form className="user__login" onSubmit={this.logInSubmitHandler}>
                                 <h3>logIn</h3>
                                 <input onChange={this.logInChangeHandler}  value={this.state.login.email} required placeholder="email" className="user__input" name="email" type="text"/>
                                 <input onChange={this.logInChangeHandler}  value={this.state.login.password} required placeholder="password" className="user__input" name="password" type="password"/>
                                 <button className="user__login--btn" type="submit">LogIn</button>
                                 <Link to="/forgotPassword"><p className="user__login--forgotPassword">Forgot Password?</p></Link>
                            </form>
                            <hr/>
                            <form className="user__register" onSubmit={this.registerSubmitHandler}>
                                 <h3>Register</h3>
                                 <div className="flex">
                                 <input value={this.state.register.firstName} onChange={this.registerChangeHandler} required placeholder="firstname" className="user__input" name="firstName" data-tip="enter a your first name" type="text"/>
                                 <input value={this.state.register.lastName} onChange={this.registerChangeHandler} required placeholder="lastname" className="user__input" name="lastName" data-tip="enter a your last name" type="text"/>
                                 </div>
                                 <input value={this.state.register.email} onChange={this.registerChangeHandler} required placeholder="email" className="user__input" name="email" type="text"/>
                                 <input value={this.state.register.password} onChange={this.registerChangeHandler} required placeholder="password" className="user__input" name="password" type="password"/>
                                 <input value={this.state.register.confirmPassword} onChange={this.registerChangeHandler} required placeholder="confirm password" className="user__input" name="confirmPassword" type="password"/>
                                <button className="user__register--btn" type="submit">SignUp</button>
                            </form>
                        </div>
                   </Modal2>,<Backdrop2 key={"backdrop2"} clicked={this.modalProfileHandler} show={this.state.profile}/>]
     }


     // else{
     //   modalLogin = [<Modal2 clicked={this.modalProfileHandler} show={this.state.profile}>
     //                    <div className="userDetail">
     //                        <Link to="myOrder">MYORDER</Link>
     //                    </div>
     //               </Modal2>,<Backdrop2 clicked={this.modalProfileHandler} show={this.state.profile}/>]
     // }


     return (
        <>
           {modal}
           {modalLogin}
           <SocialMedia userDetail={this.state.userDetail} authenticated={this.props.authenticated} logout={this.props.logout} name={this.props.name}/>
           <Router/>
           <Whatsapp/>
           <GoTOTop />
           <Switch>
              
               <Route exact path="/whoAreWe" component={WhoAreWe}/>
               <Route exact path="/showcase">
                    <SecondaryNavigation/>
                    <Showcase/>
               </Route>
              <Route exact path="/aboutUs" component={About}/>
              <Route exact path="/contactUs" component={Contact}/>
              <Route exact path="/customise" component={CustomDesign}/>
              <Route exact path="/sustainibility" component={Sustain}/>
               <Route exact path="/privacyPolicy" component={PrivacyPolicy}/>
               <Route exact path="/sizeChart" component={SizeChart}/>
               <Route exact path="/deliveryAndReturn" component={DeliveryAndReturn}/>
               <Route exact path="/forgotPassword" component={ForgotPasswordIntermediate}/>
               <Route exact path="/checkout">
                  <SecondaryNavigation/>
                  <Checkout email={this.props.email} authenticated={this.props.authenticated} cart={this.state.cart}/>
               </Route>
               <Route exact path="/myOrders">
                    <SecondaryNavigation/>
                    <MyOrders setAuthorizationHeader={this.props.setAuthorizationHeader} authenticated={this.props.authenticated} />
               </Route>
               <Route  path="/">
                   <Cart clicked={this.modalToggleHandler} cart={this.state.cart} count={this.state.cart.length}/>
                   <Profile authenticated={this.props.authenticated} clicked={this.modalProfileHandler}/>
                   <Main cart={this.state.cart} cartHandler={this.cartHandler} />
               </Route>
           </Switch>
           <Footer/>

        </>
     )
   }
 }


export default withRouter(Layout);
