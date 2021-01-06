 import React, {Component} from "react"
import axios from "axios"
import Spinner from "../../../../UI/spinner/spinner"


 class Promo extends Component{

   state={
     name:"",
     access:"public",
     value:"",
     expiryDate:"",
     sending:false,
     promos:[],
     deleting:false,
     deletingPromoID:-1,
     deletingPromoIndex:-1
   }

   componentDidMount=()=>{

    axios.get("/v1/admin/promo").
    then(res=>{
       this.setState({
            promos:[...res.data]
       })
    }).catch(err=>{
      if(err.response && err.response.data)
      alert(err.response.data[0]);
      else
        alert("contact the team");
    })
   }

   componentDidUpdate=()=>{
    if(this.state.sending){
      let newState = {
        name:this.state.name,
        access:this.state.access,
        value:this.state.value,
        expiryDate:this.state.expiryDate
      }
      axios.post("/v1/admin/promo",newState).then(res=>{
        let promos = [...this.state.promos]
        promos.push(newState)
        this.setState({
          name:"",
          access:"PUBLIC",
          value:"",
          expiryDate:"",
          sending:false,
          promos:promos
        })
        alert("Completed");
      })
      .catch(err=>{
        this.setState({
          sending:false
        })
          if(err.response && err.response.data)
          alert(err.response.data[0]);
          else
            alert("contact the team");
        })
       }


       if(this.state.deleting){
         axios.delete("/v1/admin/promo/"+this.state.deletingPromoID).then(res=>{
           let promos=[...this.state.promos]
           console.log(promos);
           promos.splice(this.state.deletingPromoIndex,1)
           console.log(promos);
           this.setState({
             deleting:false,
             deletingPromoID:-1,
             deletingPromoIndex:-1,
             promos:promos
           })
         }).
         catch(err=>{
           this.setState({
             deleting:false,
             deletingPromoID:-1,
             deletingPromoIndex:-1
           })
             if(err.response && err.response.data)
             alert(err.response.data[0]);
             else
               alert("contact the team");
           })
       }
    }





   onChangeHandler=(e)=>{
      const name= e.target.name
      const value= e.target.value
      let prevState = {...this.state}
      prevState[name]=value
      this.setState({
          ...prevState
      })
   }

   deletePromoHandler=(id,i)=>{
     this.setState({
       deleting:true,
       deletingPromoID:id,
       deletingPromoIndex:i
     })
   }

   onSubmitHandler=(e)=>{
//      console.log(this.state);
        this.setState({
          sending:true,
        })
        // e.preventDefault()
   }

   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let promos= null;
     if(this.state.promos.length!==0){
       promos = <>
                {this.state.promos.map((promo,i)=>{
          return    <tr key={promo.id}>
                     <th>{promo.name}</th>
                     <th>{promo.access}</th>
                     <th>{promo.value}</th>
                     <th>{promo.expiryDate}</th>
                     <th>{promo.createdOn}</th>
                     <th>{promo.usedBy}</th>
                     <th><input onClick={()=>this.deletePromoHandler(promo.id,i)} style={{background:"red"}} className="subscribe__box--btn" value="delete" type="submit"/></th>
                  </tr>
                })}
       </>
     }
     if(this.state.deleting){
       return <Spinner />
     }


     return (
       <div className="subscribe">
           <div className="subscribe__box">
             <form onSubmit={this.onSubmitHandler}>
               <input required onChange={this.onChangeHandler} name="name" value={this.state.name} className="subscribe__box--name" type="text" placeholder="name"/>
               <select
               className="subscribe__box--name"
               onChange={this.onChangeHandler}
               value={this.state.access}
               name="access"
               id="value">
                 <option className="addCategory__form--select-option" >SELECT ACCESS TYPE</option>
                 <option default className="addCategory__form--select-option" value="PUBLIC">PUBLIC</option>
                 <option className="addCategory__form--select-option" value="PRIVATE">PRIVATE</option>
               </select>
               <input required onChange={this.onChangeHandler} name="value" value={this.state.value} className="subscribe__box--name" type="text" placeholder="access type"/>
               <input required onChange={this.onChangeHandler} name="expiryDate" value={this.state.expiryDate} className="subscribe__box--name" type="date" placeholder="access type"/>
              {this.state.sending?null: <input className="subscribe__box--btn" value="update" type="submit"/>}
             </form>
           </div>
           <table cellspacing="20px" className="subscribe__table">
               <thead>
                  <tr>
                     <th>name</th>
                     <th>access</th>
                     <th>value</th>
                     <th>expiry date</th>
                     <th>created On</th>
                     <th>usedBy</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                   {promos}
               </tbody>
           </table>
       </div>
     )
   }
 }


export default Promo;
