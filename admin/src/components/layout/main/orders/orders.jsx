 import React, {Component} from "react"
 import axios from "axios"

 class Orders extends Component{

   state={
      myOrders:[],
      pageNum:0,
      maxPageNum:null,
      totalOrders:0,
      status:"All",
      setStatus:"",

    }

    trackIdInputChangeHandler=(e,i)=>{
      let orders= [...this.state.myOrders]
      orders[i].trackIdInput=e.target.value
      this.setState({
        myOrders:[...orders]
      })
    }

    trackIdInputSubmitHandler=(e,id,i)=>{
      // console.log(id+" "+this.state.myOrders[i].trackIdInput)
axios.post(`/v1/admin/order/${this.state.myOrders[i].orderId}/trackingId/${this.state.myOrders[i].trackIdInput}`);
      e.preventDefault();
 }
 

    componentDidMount=()=>{
      axios.get("/v1/admin/order",{params:{pageNumber:0}}).then(res=>{
         let orders=[...res.data.orders]
         orders.forEach((order,i)=>(
           order.trackIdInput="",
           order.savedtrackIdInput=""
         ))
         this.setState({
           myOrders:[...orders],
           maxPageNum:Math.ceil(res.data.total/3)-1,
           totalOrders:res.data.total,
           pageNum:0
         })
      }).catch(err=>{
        if(err.response && err.response.data[0]){
          alert(err.response.data[0]);
        }else{
          alert("something went wrong....!!!!");
        }
      })
    }

    paginationHandler=(operation)=>{
      if(operation==="minus" && this.state.pageNum>0){
        axios.get("/v1/admin/order",{params:{pageNumber:(this.state.pageNum-1)}}).then(res=>{
          let orders=[...res.data.orders]
         orders.forEach((order,i)=>(
           order.trackIdInput="",
           order.savedtrackIdInput=""
         ))
           this.setState({
             myOrders:[...orders],
             pageNum:this.state.pageNum-1,

             // maxPageNum:Math.ceil(res.data.total/3)-1,
           })
        }).catch(err=>{
          if(err.response && err.response.data[0]){
            alert(err.response.data[0]);
          }else{
            alert("something went wrong....!!!!");
          }
        })
      }
      if(operation==="plus" && this.state.pageNum<this.state.maxPageNum){
        axios.get("/v1/admin/order",{params:{pageNumber:(this.state.pageNum+1)}}).then(res=>{
          let orders=[...res.data.orders]
          orders.forEach((order,i)=>(
            order.trackIdInput="",
            order.savedtrackIdInput=""
          ))
           this.setState({
             myOrders:[...orders],
             pageNum:this.state.pageNum+1,
             // maxPageNum:Math.ceil(res.data.total/3)-1,
           })
        }).catch(err=>{
          if(err.response && err.response.data[0]){
            alert(err.response.data[0]);
          }else{
            alert("something went wrong....!!!!");
          }
        })
      }
    }

  componentDidUpdate=(prevProps,prevState)=>{
    if(prevState.status!==this.state.status){
        if(this.state.status==="ALL")
        axios.get("/v1/admin/order",{params:{pageNumber:0}}).then(res=>{
           this.setState({
             myOrders:[...res.data.orders],
             maxPageNum:Math.ceil(res.data.total/3),
             totalOrders:res.data.total,
             pageNum:0
           })
        }).catch(err=>{
          if(err.response && err.response.data[0]){
            alert(err.response.data[0]);
          }else{
            alert("something went wrong....!!!!");
          }
        })
        else
        axios.get("/v1/admin/order/status/"+this.state.status,{params:{pageNumber:0}}).then(res=>{
           this.setState({
             myOrders:[...res.data.orders],
             maxPageNum:Math.ceil(res.data.total/3),
             totalOrders:res.data.total,
             pageNum:0
           })
        }).catch(err=>{
          if(err.response && err.response.data[0]){
            alert(err.response.data[0]);
          }else{
            alert("something went wrong....!!!!");
          }
        })
    }
  }


  onStatusChangeHandler=(id,index,status)=>{


    let newOrders=[...this.state.myOrders];
    let newOrder=newOrders[index];
    newOrder.status=status;

    axios.put("/v1/admin/order/updateOrderStatus/"+id+"/"+status).
    then(res=>{
      this.setState({
        myOrders:newOrders,
      })
    }).catch(err=>{
      if(err.response && err.response.data[0]){
        alert(err.response.data[0]);
      }else{
        alert("something went wrong....!!!!");
      }
    })


  }



    render(){
      if(!this.props.authenticated){
        window.location.href=this.props.address;
      }
      // if(!this.props.authenticated){
      //   window.location.href = "http://localhost:3001";
      // }\
     // document.querySelector(".asvb").addEventListener("click",()=>{console.log("EVENT")})

      return (
           <div className="myOrders">
           <div className="nav__list--item product__details--aspect-size">Status : {this.state.status}
                   <span className="dropdown">
                       <span onClick={()=>this.setState({status:"ALL"})} className="dropdown__item">ALL</span>
                       <span onClick={()=>this.setState({status:"PLACED"})} className="dropdown__item">PLACED</span>
                       <span onClick={()=>this.setState({status:"PAYMENT_PENDING"})} className="dropdown__item">PAYMENT PENDING</span>
                       <span onClick={()=>this.setState({status:"DELIVERED"})} className="dropdown__item">DELIVERED</span>
                       <span onClick={()=>this.setState({status:"PAYMENT_FAILED"})} className="dropdown__item">PAYMENT FAILED</span>
                       <span onClick={()=>this.setState({status:"REFUND_COMPLETED"})} className="dropdown__item">REFUND COMPLETED</span>
                       <span onClick={()=>this.setState({status:"REFUND_REQUESTED"})} className="dropdown__item">REFUND REQUESTED</span>
                       <span onClick={()=>this.setState({status:"SHIPPED"})} className="dropdown__item">SHIPPED</span>
                       <span onClick={()=>this.setState({status:"CANCELED"})} className="dropdown__item">CANCELED</span>
                   </span></div>
              <div className="pagination"><span onClick={()=>this.paginationHandler("minus")} className="pagination__minus">-</span><span className="pagination__num">{this.state.myOrders.length===0?"0":this.state.pageNum+1}/{this.state.myOrders.length===0?"0":this.state.maxPageNum+1}</span><span onClick={()=>this.paginationHandler("plus")} className="pagination__plus">+</span></div>
              <div className="pagination pagination-2">Total Orders:<strong>{this.state.totalOrders}</strong></div>
              {this.state.myOrders.length!==0?this.state.myOrders.map((order,i)=>(
                 <div className="myOrders__box">
                     <div className="myOrders__box--orderId">Date: <span>{order.orderedOnDate}</span></div>
                     <div className="myOrders__box--orderId">Time: <span>{order.orderedOnTime}</span></div>
                     <div className="myOrders__box--orderId">Status: <span>{order.status}</span></div>
                     <div className="myOrders__box--orderId">Total: ₹<span>{order.total}</span></div>
                     {order.transactionId?<div className="myOrders__box--orderId">TransactionId: <span>{order.transactionId}</span></div>:null}
                     <div className="myOrders__box--orderId">OrderId: <span>{order.orderId}</span></div>
                     <hr className="myOrders__box--hr"/>
                     <div className="flexer">
                         <div className="orderItems">
                              {order.orderItems.map((orderItem,i)=>(
                                     <div className="orderItems__card">
                                         <img className="orderItems__card--item orderItems__card--image" src={'data:image/png;base64,'+orderItem.image} alt=""/>
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
                              <div className="nav__list--item product__details--aspect-size">Status : {order.status}
                                      <span className="dropdown">
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"PLACED")} className="dropdown__item">PLACED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"PAYMENT_PENDING")} className="dropdown__item">PAYMENT PENDING</span>
                                          <span onClick={()=>this.onSftatusChangeHandler(order.id,i,"DELIVERED")} className="dropdown__item">DELIVERED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"PAYMENT_FAILED")} className="dropdown__item">PAYMENT FAILED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"REFUND_COMPLETED")} className="dropdown__item">REFUND COMPLETED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"REFUND_REQUESTED")} className="dropdown__item">REFUND REQUESTED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"SHIPPED")} className="dropdown__item">SHIPPED</span>
                                          <span onClick={()=>this.onStatusChangeHandler(order.id,i,"CANCELED")} className="dropdown__item">CANCELED</span>
                                      </span></div>
                          </div>
                          <form style={{flexBasis:"100%"}} onSubmit={(e)=>this.trackIdInputSubmitHandler(e,order.id,i)}>
                               <input  type="text" onChange={(e)=>this.trackIdInputChangeHandler(e,i)} value={order.trackIdInput&&order.trackIdInput.length<=0?order.trackingId:order.trackIdInput} name="trackIdInput"/>
                               <button type="submit">save</button>
                          </form>
                          {/* {order.savedtrackIdInput!==""?<div style={{flexBasis:"100%"}} className="myOrders__box--orderId">savedtrackIdInput: <span>{order.savedtrackIdInput}</span></div>:null} */}
                     </div>
                 </div>
              )): <div id="heading" className="noMatch">
             <div className="noMatch__text">no orders yet</div>
                   </div>}
           </div>
      )
    }
  }


export default Orders;
