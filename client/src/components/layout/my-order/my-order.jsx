 import React, {Component} from "react"
 import axios from "axios"
 import {Link} from "react-router-dom"
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../../UI/spinner/spinner"

 class MyOrders extends Component{

   state={
     flag:-1,
     myOrders:[],
     query:"",
     querying:false
   }

   getCookie=(value)=> {

    let cookies= document.cookie+";";
 
    if(cookies.indexOf(value)<0)
    return null;
 
   return cookies.substring(cookies.indexOf(value)+(value.length+1),cookies.indexOf(";",cookies.indexOf(value)+1));
 
 }
 

   componentDidMount=()=>{

    if(this.getCookie("jwt")!==null)
    {
      this.props.setAuthorizationHeader(this.getCookie("jwt"),this.getCookie("email"),this.getCookie("name"));
  }

     window.scrollTo({top:0,behaviour:"smooth"});

     axios.get("/v1/order").then(res=>{

          let myOrders=[...res.data];
          myOrders.forEach(order=>{
            order.newQuery=""
          })
        this.setState({
          myOrders:[...myOrders],
          flag:0
        })


     }).catch(err=>{
       if(err.response && err.response.data[0]){
         toast.error(err.response.data[0]);
       }else{
         toast.error("something went wrong....!!!!");
       }
     })
   }

   onChangeHandler=(e,index)=>{

       let newOrders=[...this.state.myOrders]
       let newOrder=newOrders[index];
       newOrder.newQuery=e.target.value;
       this.setState({
           myOrders:[...newOrders]
       })
   }

   queryHandler=(e,id,index)=>{
     if(this.state.myOrders[index].newQuery.length>0)
         axios.post("/v1/order/addQuery/"+id,null,{params:{query:this.state.myOrders[index].newQuery}})
         .then(res=>{
           console.log("THEN");
           let newOrders=[...this.state.myOrders]
           let newOrder=newOrders[index];
           newOrder.queries.push(newOrder.newQuery);
           newOrder.newQuery="";
          this.setState({
              myOrders:[...newOrders]
          })

         }).catch(err=>{
          console.log("CATCh");
           if(err.response && err.response.data[0]){
             toast.error(err.response.data[0]);
           }else{
             toast.error("something went wrong....!!!!");
           }
         })

     e.preventDefault()
   }



   render(){




     if(!this.props.authenticated && this.getCookie("jwt")===null){
       window.location.href = "http://glacial-inlet-64341.herokuapp.com/";
     }

     if(this.state.flag===-1){
         return <div style={{display:"flex",justifyContent:"center"}}>
                    <Spinner/>
                </div>
     }

     return (
          <div className="myOrders">
             {this.state.myOrders.length!==0?this.state.myOrders.map((order,i)=>(
                order.status==="PLACED"?<div key={order.id+i} className="myOrders__box">
                    <div className="myOrders__box--orderId">Date: <span>{order.orderedOnDate}</span></div>
                    <div className="myOrders__box--orderId">Time: <span>{order.orderedOnTime}</span></div>
                    <div className="myOrders__box--orderId">Status: <span>{order.status}</span></div>
                    <div className="myOrders__box--orderId">Total: ₹<span>{order.total}</span></div>
                    {order.transactionId?<div className="myOrders__box--orderId">TransactionId: <span>{order.transactionId}</span></div>:null}
                    <div className="myOrders__box--orderId">OrderId: <span>{order.orderId}</span></div>
                    <hr className="myOrders__box--hr"/>
                    <div className="flexer">
                        <div className="orderItems">
                             {order.orderItems.map((orderItem,ii)=>(
                                    <div key={orderItem.id+ii} className="orderItems__card">
                                        <img className="orderItems__card--item orderItems__card--image" src={orderItem.image} alt=""/>
                                        <div className="orderItems__card--items">
                                        <div className="orderItems__card--item orderItems__card--size">Size: <span>{orderItem.size}</span></div>
                                            <div className="orderItems__card--item orderItems__card--name">Name: <span>{orderItem.productName}</span></div>
                                            <div className="orderItems__card--item orderItems__card--quantity">Quantity: <span>{orderItem.quantity}</span></div>
                                            <div className="orderItems__card--item orderItems__card--price">Price: <span> ₹{orderItem.price}</span></div>
                                        </div>
                                    </div>
                             ))}
                         </div>
                         <div className="queries">
                               <form className="queries__form" onSubmit={(e)=>this.queryHandler(e,order.id,i)}>
                                    <input className="queries__form--input" onChange={(e)=>this.onChangeHandler(e,i)} value={this.state.myOrders[i].newQuery} placeholder="Post your Query" type="text"/>
                                    <button className="queries__form--btn">Post</button>
                               </form>
                               <div className="queries__posts">
                                   <ol className="queries__posts--list">
                                       {order.queries.map((query,i)=>(
                                         <li>{query}</li>
                                       ))}
                                   </ol>
                               </div>
                         </div>
                         <div className="myOrders__box--address">
                             <h4 className="myOrders__box--address-head">Shipping Addres</h4>
                             <hr className="myOrders__box--hr"/>
                             <div className="myOrders__box--address-item">{order.address.customerName}</div>
                             <div className="myOrders__box--address-item">{order.address.customerPhone}</div>
                             <div className="myOrders__box--address-item">{order.address.houseNumber}</div>
                             <div className="myOrders__box--address-item">{order.address.location}</div>
                             <div className="myOrders__box--address-item">{order.address.landmark}</div>
                             <div className="myOrders__box--address-item">{order.address.city}</div>
                             <div className="myOrders__box--address-item">{order.address.state}</div>
                             <div className="myOrders__box--address-item">{order.address.pincode}</div>
                             {order.promoDiscount!==0?<h4 className="myOrders__box--address-head">Promo Details</h4>:null}
                             <hr className="myOrders__box--hr"/>
                             {order.promoDiscount!==0?<div className="myOrders__box--orderId">Promo Discount: ₹{order.promoDiscount}</div>:null}<br/>
                             {order.paymentMode?<div className="myOrders__box--orderId">Payment Mode: {order.paymentMode}</div>:null}
                         </div>

                    </div>
                    {order.trackingId?<div className="myOrders__box--orderId">TrackingId: <span>{order.trackingId}</span></div>:null}
                    {order.trackingId?<a href="https://www.dtdc.in/tracking/shipment-tracking.asp" target="_blank">click here to track your order</a>:null}
                </div>:null
             )): <div id="heading" className="noMatch">
             <div className="noMatch__text">0 order found</div>
             <div  className="noMatch__suggestion">Whoever said that money can’t buy happiness simply didn’t know where to go shopping. <Link to="/">Start Shopping</Link></div>
            </div>
            }
          </div>
     )
   }
 }


export default MyOrders;
