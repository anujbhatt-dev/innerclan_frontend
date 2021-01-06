import React, {Component} from "react"
import Spinner from "../../../../UI/spinner/spinner"
import axios from "axios"

 class Clients extends Component{

   state={
     clients:[]
   }

   componentDidMount=()=>{

    axios.get("/v1/admin/client").
    then(res=>{
       this.setState({
            clients:[...res.data]
       })
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
     let clients= null;
     if(this.state.clients.length!==0){
       clients = <>
                {this.state.clients.map((client,i)=>{
          return    <tr key={client.id}>
                     <th>{i+1}</th>          
                     <th>{client.firstName}</th>          
                     <th>{client.lastName}</th>
                     <th>{client.email}</th>
                     <th>{client.totalOrder}</th>
                     <th>{client.visit}</th>
                     <th>{client.phone?client.phone:"null"}</th>
                     <th>{client.createdOn}</th>
                     <th>{client.lastLoggedIn}</th>
                     <th>{client.uuid}</th>
                  </tr>
                })}
       </>
     }
     if(this.state.deleting)
     {
       return <Spinner />
     }

     return (
       <div className="subscribe">
           <table cellspacing="20px" className="subscribe__table">
               <thead>
                  <tr>
                     <th>S.No.</th> 
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Total Orders</th>
                     <th>Visits</th>
                     <th>Phone Number</th>
                     <th>created On</th>
                     <th>Last LoggedIn</th>
                     <th>uuid</th>
                  </tr>
               </thead>
               <tbody>
                   {clients}
               </tbody>
           </table>
       </div>
     )
   }
 }


export default Clients;
