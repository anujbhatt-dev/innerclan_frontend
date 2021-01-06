 import React, {Component} from "react"
import axios from "axios"
import dwight from "../../../../assets/images/dwight.jpg"

 class Designs extends Component{

   state={
     customOrders:[]
   }

    componentDidMount=()=>{
      axios.get("/v1/admin/design/getDesigns").then(res=>{
        console.log(res.data);
        this.setState({customOrders:[...res.data]})
      }).catch(err=>{
        if(err.response && err.response.data)
        alert(err.response.data[0]);
        else
        alert("contact the team");
       })
  }

  designDeleteHandler=(id,i)=>{
    axios.delete("/v1/admin/design",{params:{id:id}}).then(res=>{
         // let newState={...this.state.customOrders}
         // newState.splice(i,1);
         // this.setState({
         //   customOrders:{...newState}
         // })
    }).catch(err=>{
      if(err.response && err.response.data)
      alert(err.response.data[0]);
      else
      alert("contact the team");
    })
  }


   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let customOrders = null;
     if(this.state.customOrders.length!==0){
        customOrders = <div className="designs">
                            {this.state.customOrders.map((customOrder,i)=>(
                              <div className="designs__box" key={customOrder.id}>
                                <div className="designs__box--item">{customOrder.email}</div>
                                <div className="designs__box--item">{customOrder.createdOn}</div>
                                <div className="designs__box--item">{customOrder.comment}</div>
                                <img className="designs__box--image" src={customOrder.image} alt="dwight"/>
                                <button id="delete" onClick={()=>this.designDeleteHandler(customOrder.id,i)} type="submit" className="products__box--btn updateProduct__delete--btn">delete</button>
                              </div>
                            ))}
                       </div>
     }

     return (
        customOrders

     )
   }
 }


export default Designs;
