import React, { Component } from 'react'
import axios from 'axios';


 class Showcase extends Component {

    state={
        data:[],
        images:[],
    }

    componentDidMount=()=>{
        axios.get("/v1/client/ui/showcase").
        then(res=>this.setState({data:res.data}));
    }

    submitHandler=(e)=>{

        e.preventDefault();
        let formData = new FormData();
        for(let i=0 ;i<this.state.images.length;i++)
        formData.append("files",this.state.images[i]);
        axios.post("/v1/admin/ui/showcase",formData)
        .then(res=>alert("SAVED"))
        .catch(err=>alert("oops ...!"));

        // console.log(e.target.files.length);

    }

    uploadHandler=(event)=>{

        let images=[]
    
        for(let i=0; i<event.target.files.length;i++)
             images.push(event.target.files[i]);
        this.setState({
          images:images,
      })
    }
    

    // test=(e)=>{
    //     alert("eeeeee");
    //     e.preventDefault();
    // }

    deleteHandler=(i)=>{
        
        axios.delete("/v1/admin/ui/showcase/"+this.state.data[i].id).
        then(res=>{let data=this.state.data;
                   data.splice(i,1);
                   this.setState({data:data}) ;
                }).
         catch(res=>alert("Opps.."));       
    }
    

    render() {
        return (
            <div>
              <form onSubmit={this.submitHandler}>
              <input onChange={this,this.uploadHandler} required   type="file" multiple/>
                  <input type="submit" value="SUBMIT" />
              </form>

                {this.state.data.map((d,i)=> 
                <div>
                <img src={d.image} alt=""/>
                <button onClick={()=>this.deleteHandler(i)}>remove</button>
                </div>
           )}
            </div>
        )
    }
}


export default Showcase;