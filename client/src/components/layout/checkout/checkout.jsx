 import React, {Component} from "react"
import ReactToolip from "react-tooltip"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 class Checkout extends Component{
   state={
     gTotal:null,
     finalAmount:null,
     formDetails:{
       customerName:"",
       customerPhone:"",
       houseNumber:"",
       email:"",
       landmark:"",
       location:"",
       city:"",
       state:"",
       pincode:"",
       coupon:"",
     },
     couponDetails:{
       message:"",
       value:"-1"
     },
     validCouponName:"",
     orders:[],
     couponAppling:false,
     payButton:"PAY"
   }

   couponSubmitHandler=(e)=>{
       this.setState({couponAppling:true})
       e.preventDefault();
   }

   onChangeHandler=(e)=>{
     let  newForm = {...this.state.formDetails}
     newForm[e.target.name]=e.target.value
     this.setState({
       formDetails:{...newForm}
     })
   }

   componentDidMount=()=>{
     let formDetails=null
     let gt = this.props.cart.map(product=>(product.quantity*product.productPrice)).reduce((acc,value)=>acc+value)
     this.setState({gTotal:gt,orders:[...this.props.cart],finalAmount:gt+Math.round(gt*18/100)})
     axios.get("/v1/order/getAddress").then(res=>{

      formDetails={
         customerName:res.data.customerName,
         customerNumber:res.data.customerNumber,
         landmark:res.data.landmark,
         location:res.data.location,
         city:res.data.city,
         state:res.data.state,
         pincode:res.data.pincode,
         coupon:""
       }
       this.setState({formDetails:{...formDetails}})
     }).catch(err=>{
       if(err.response && err.response.data[0]){
         toast.error(err.response.data[0]);
       }else{
         toast.error("something went wrong search");
       }
     })
     formDetails={
       email:this.props.email
     }
     this.setState({formDetails:formDetails})
     document.getElementById("links").scrollIntoView()
   }

   componentDidUpdate=(prevState,prevProps)=>{
     if(this.state.couponAppling){
       // if(){
         axios.get('/v1/admin/promo/isValid/'+this.state.formDetails.coupon).then(res=>{
           console.log(res.data);
           this.setState({
             couponAppling:false,
             couponDetails:{...res.data},
             finalAmount:(res.data.value!=="-1")?((this.state.finalAmount-res.data.value)<=0?1:(this.state.finalAmount-res.data.value)):this.state.finalAmount,
             validCouponName:this.state.formDetails.coupon
           })
           console.log(this.state);
         }).catch(err=>{
           this.setState({
             couponAppling:false
           })
           if(err.response && err.response.data[0]){
             toast.error(err.response.data[0]);
           }else{
             toast.error("something went wrong search");
           }
         })
       }
       // }
   }


   placeOrderHandler=(e)=>{

     let param={}
     if(this.state.couponDetails.message==="VALID PROMO CODE"){
       param={
         promo:this.state.validCouponName,
       }
     }else if(this.state.couponDetails.message==="INVALID PROMO CODE"){
       param={
         promo:-1,
       }
     }else{
          param={
            promo:-1,
          }


      }

     document.getElementById("btn__id").disabled = true;
     this.setState({payButton:"REDIRECTING..."})

     axios.post("/v1/order/placeOrder",this.state.formDetails,{params:param})
     .then(res=>{
      let payload=res.data;

       let uri = "CALLBACK_URL="+encodeURIComponent(payload.CALLBACK_URL)+
         "&CHANNEL_ID="+encodeURIComponent(payload.CHANNEL_ID)+
         "&CHECKSUMHASH="+encodeURIComponent(payload.CHECKSUMHASH)+
         "&CUST_ID="+encodeURIComponent(payload.CUST_ID)+
         "&INDUSTRY_TYPE_ID="+encodeURIComponent(payload.INDUSTRY_TYPE_ID)+
         "&MID="+encodeURIComponent(payload.MID)+
         "&ORDER_ID="+encodeURIComponent(payload.ORDER_ID)+
         "&TXN_AMOUNT="+encodeURIComponent(payload.TXN_AMOUNT)+
         "&WEBSITE="+encodeURIComponent(payload.WEBSITE)

        //  alert(
        //   "https://securegw-stage.paytm.in/theia/processTransaction?"+uri
        //   );

          window.location.href="https://securegw-stage.paytm.in/theia/processTransaction?"+uri;
          }
         ).catch(e=>{
           document.getElementById("btn__id").disabled = false;
           this.setState({payButton:"TRY AGAIN"})
         });

  e.preventDefault();
   }





   render(){
     if(!this.props.authenticated){
       window.location.href = "http://glacial-inlet-64341.herokuapp.com/";
     }

     console.log(this.props.cart);
     return (
        <div className="checkout">
              <div className="checkout__details">
                 <form className="checkout__form" onSubmit={this.placeOrderHandler}>
                     <h3 style={{flexBasis:"100%",textAlign:"center", padding:"1rem 0"}}>Billing Address</h3>
                     <input required className="checkout__form--input" placeholder="email" onChange={this.onChangeHandler} name="email" value={this.state.formDetails.email} type="text"/>
                     <input required className="checkout__form--input" placeholder="name" onChange={this.onChangeHandler} name="customerName" value={this.state.formDetails.customerName} type="text"/>
                     <input required className="checkout__form--input" placeholder="number" onChange={this.onChangeHandler} name="customerPhone" value={this.state.formDetails.customerPhone} type="Number"/>
                     <input required className="checkout__form--input" placeholder="house number" onChange={this.onChangeHandler} name="houseNumber" value={this.state.formDetails.houseNumber} type="text"/>
                     <input required className="checkout__form--input checkout__form--location" placeholder="location" onChange={this.onChangeHandler} name="location" value={this.state.formDetails.location} type="text"/>
                     <input required className="checkout__form--input" placeholder="landmark" onChange={this.onChangeHandler} name="landmark" value={this.state.formDetails.landmark} type="text"/>
                     <input required className="checkout__form--input" placeholder="pincode" onChange={this.onChangeHandler} name="pincode" value={this.state.formDetails.pincode} type="text"/>
                     <input required className="checkout__form--input" placeholder="city" onChange={this.onChangeHandler} name="city" value={this.state.formDetails.city} type="text"/>
                     <input required className="checkout__form--input" placeholder="state" onChange={this.onChangeHandler} name="state" value={this.state.formDetails.state} type="text"/>
                     <input id="btn__id" disabled={false} className="checkout__form--input checkout__form--btn" type="submit" value={this.state.payButton}/>
                 </form>
              </div>
             <h5 className="checkout__h5">
             <div><span className="checkout__h5Desktop--tax"><strong style={{color:"black",fontWeight:"bolder"}}>Subtotal</strong></span><span className="checkout__h5Desktop--tax"><strong style={{color:"black",fontWeight:"bolder"}}>₹{this.state.gTotal}</strong></span></div><br/>
             <hr className="checkout__hr" style={{margin:".2rem",width:"100%"}}/>
             <div><span className="checkout__h5Desktop--tax">Shipping</span><span className="checkout__h5Desktop--tax">free</span></div><br/>
             <div><span className="checkout__h5Desktop--tax">Tax(18%)</span><span className="checkout__h5Desktop--tax" style={{color:"black",fontWeight:"bolder"}}>₹{Math.round(this.state.gTotal*18/100)}</span></div><br/>
             {this.state.couponDetails.value!=="-1"?<><div><span className="checkout__h5Desktop--tax">Discount</span><span className="checkout__h5Desktop--tax" style={{color:"black",fontWeight:"bolder"}}>₹{this.state.couponDetails.value}</span></div><br/></>:null}
             <hr className="checkout__hr" style={{margin:".2rem",width:"100%"}}/>
             Grand Total {" "} <span style={{color:"black",fontWeight:"bolder"}}> ₹{(this.state.gTotal+Math.round(this.state.gTotal*18/100)===this.state.finalAmount && this.state.couponDetails.value==="-1")?this.state.finalAmount:<span>{this.state.finalAmount} <br/> (coupon applied)</span>}</span></h5>
             <div className="checkout__product">
              {this.state.orders.length?this.state.orders.map((product,i)=>(
                <div className="checkout__product--box">
                    <img className="checkout__product--box-item checkout__product--box-img" src={product.selectedColorImage} alt=""/>
                    <div className="checkout__product--box-col1">
                        <div data-tip={product.productName} className="checkout__product--box-item checkout__product--box-name">{(product.productName.length>25)?product.productName.slice(0,25):product.productName}{(product.productName.length>25)?"...":null}</div><ReactToolip/>
                        <div className="checkout__product--box-item checkout__product--box-size">{product.size}</div>
                        <div className="checkout__product--box-item checkout__product--box-color">{product.selectedColorName}</div>
                    </div>
                    <div className="checkout__product--box-item checkout__product--box-productPrice">₹ {product.productPrice}</div>
                    <div className="checkout__product--box-item checkout__product--box-quantity">{product.quantity}</div>
                    <div className="checkout__product--box-item checkout__product--box-productPrice">₹ {product.productPrice * product.quantity}</div>
                </div>
              )):null}
              <hr className="checkout__hr"/>
              <div className="checkout__coupon">
                  <form className="checkout__coupon--form" onSubmit={this.couponSubmitHandler}>
                      <input  className="checkout__coupon--form-input" name="coupon" onChange={this.onChangeHandler} value={this.state.formDetails.coupon} type="text"/>
                      <button   className="checkout__coupon--form-btn" type="submit">Apply</button>
                  </form>
                  <div className="checkout__coupon--form-text">{this.state.couponDetails.length!==0?this.state.couponDetails.message:null}</div>
              </div>

              <h5 className="checkout__h5Desktop">
              <div><span className="checkout__h5Desktop--tax"><strong style={{color:"black",fontWeight:"bolder"}}>Subtotal</strong></span><span className="checkout__h5Desktop--tax"><strong style={{color:"black",fontWeight:"bolder"}}>₹{this.state.gTotal}</strong></span></div><br/>
              <hr className="checkout__hr" style={{margin:".2rem",width:"100%"}}/>
              <div><span className="checkout__h5Desktop--tax">Shipping</span><span className="checkout__h5Desktop--tax">free</span></div><br/>
              <div><span className="checkout__h5Desktop--tax">Tax(18%)</span><span className="checkout__h5Desktop--tax" style={{color:"black",fontWeight:"bolder"}}>₹{Math.round(this.state.gTotal*18/100)}</span></div><br/>
              {this.state.couponDetails.value!=="-1"?<><div><span className="checkout__h5Desktop--tax">Discount</span><span className="checkout__h5Desktop--tax" style={{color:"black",fontWeight:"bolder"}}>₹{this.state.couponDetails.value}</span></div><br/></>:null}
              <hr className="checkout__hr" style={{margin:".2rem",width:"100%"}}/>
              Grand Total {" "} <span style={{color:"black",fontWeight:"bolder"}}> ₹{(this.state.gTotal+Math.round(this.state.gTotal*18/100)===this.state.finalAmount && this.state.couponDetails.value==="-1")?this.state.finalAmount:<span>{this.state.finalAmount} <br/> (coupon applied)</span>}</span></h5>
            </div>
        </div>
     )
   }
 }


export default Checkout;
