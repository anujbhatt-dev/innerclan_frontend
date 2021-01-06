 import React, {Component} from "react"
import axios from "axios"


 class Subscribe extends Component{

   state={
     link:"",
     subject:"",
     body:"",
     subscriptions:[],
     sending:false,
   }

   componentWillMount=()=>{

    axios.get("/v1/admin/subscription").then(res=>{
      console.log(res.data)
      this.setState({
        subscriptions:[...res.data],
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
      let params={
        link:this.state.link,
        subject:this.state.subject,
        body:this.state.body
      }
      axios.get("/v1/admin/subscription/mail",{
        params:params
      }).then(res=>{
        this.setState({
          link:"",
          subject:"",
          body:"",
          sending:false,
        })
        alert("Completed");
      }).
      catch(err=>{
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

   onSubmitHandler=()=>{
//      console.log(this.state);
this.setState({
  sending:true,
})
   }

   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }

     return (
       <div className="subscribe">
           <div className="subscribe__box">
             <form onSubmit={this.onSubmitHandler}>
               <input required onChange={this.onChangeHandler} name="link" value={this.state.link} className="subscribe__box--name" type="text" placeholder="Link"/>
               <input required onChange={this.onChangeHandler} name="subject" value={this.state.subject} className="subscribe__box--name" type="text" placeholder="subject"/>
               <textarea required onChange={this.onChangeHandler} value={this.state.body} name="body" style={{height:"15rem"}} className="subscribe__box--name" placeholder="message"></textarea>
              {this.state.sending?null: <input className="subscribe__box--btn" value="update" type="submit"/>}
             </form>
           </div>
           <table cellspacing="20px" className="subscribe__table">
               <thead>
                  <tr>
                     <th>email</th>
                     <th>subscribed on</th>
                  </tr>
               </thead>
               <tbody>
               {this.state.subscriptions.length!==0?
                    this.state.subscriptions.map((subscriber,i)=>(
                      <tr>
                          <th>{subscriber.email}</th>
                          <th>{subscriber.createdOn}</th>
                      </tr>
     ))


                   :null}
               </tbody>
           </table>
       </div>
     )
   }
 }


export default Subscribe;
