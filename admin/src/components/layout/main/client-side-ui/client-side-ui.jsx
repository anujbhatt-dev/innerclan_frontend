import React, { Component } from 'react'
import axios from 'axios'


class ClientSideUI extends Component {


    state={
       data:[{
        quote:"",
        image:"",
       }]
    }

    componentDidMount=()=>{

        axios.get("/v1/admin/ui").then(res=>{
            if(res.data.length>0){
              
              console.log(res.data)
                this.setState({
                     data:res.data,
               })
            }
        })
    }


    addUIElement=()=>{

      let newData=[...this.state.data];
      newData.push({
        quote:"",
        image:"",
      })

      this.setState({data:newData});

    }

    onChangeHandler=(e,i)=>{
        let name=e.target.name;
        let value= e.target.value;
          
        let newUi= {...this.state.data[i]};
        newUi[name]=value;


        let newData=[...this.state.data];
          newData[i]=newUi;

          this.setState({
           data:newData
          })

    }


    onSubmitHandler=(i)=>{


      let data={};
      data["image"]=this.state.data[i]["image"];
      data["quote"]=this.state.data[i]["quote"];

      if(this.state.data[i]["id"])
      data["id"]=this.state.data[i]["id"];

      axios.post("/v1/admin/ui",data).
        then(res=>{
            alert("Saved");
        }).
        catch(err=>alert("Something went wrong"));
    }


    deleteUIHandler=(i)=>{

      if(this.state.data.length===1)
{       alert("can't delete only one left");
    
return ;

}

       if(!this.state.data[i]["id"])
       {
        console.log(i+"  "+this.state.data[i]["id"])

        let data=[...this.state.data];
        data.splice(i,1)
        
        this.setState({data:data})
       
        return ;
       }

      axios.delete("/v1/admin/ui/"+this.state.data[i].id)
      .then(res=>{
        
        let data=[...this.state.data];
        data.splice(i,1)
        
        this.setState({data:data})
       
      })
      
      .catch(err=>alert("OOpss"));
    }




    render() {
      if(!this.props.authenticated){
        window.location.href=this.props.address;
      }
        return (
            <div className="subscribe">
            <div className="subscribe__box">
              {this.state.data.map((ui,i)=>
                
                <div >
                <input required onChange={(e)=>this.onChangeHandler(e,i)} name="quote" value={ui.quote} className="subscribe__box--name" type="text" placeholder="quote"/>
                <textarea required onChange={(e)=>this.onChangeHandler(e,i)} name="image" value={ui.image} className="subscribe__box--name" type="text" placeholder="image"></textarea>
               <button className="subscribe__box--btn"  onClick={()=>this.onSubmitHandler(i)} >Save</button>
               <button onClick={()=>this.deleteUIHandler(i)}>Delete</button>
              </div>
                )}
            <button onClick={this.addUIElement} >ADD</button>
            </div>

        </div>
        )
    }
}


export default  ClientSideUI;
