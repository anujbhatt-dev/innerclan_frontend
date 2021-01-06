import React, { Component } from 'react'
import axios from 'axios';
import Spinner from "../../../../../../UI/spinner/spinner"

class AddImages extends Component {


    state= {
        colorName:"",
        images:[],
        addingImage:false,
        imageAdded:false,

    }


    componentDidUpdate=()=>{

        let i=0;
        if(this.state.addingImage){

        for ( i=0;i<this.state.images.length;i++){
            let formData = new FormData();
            formData.append("file",this.state.images[i]);
            axios.post("/v1/admin/product/addColorImage/"+this.props.id,formData)
            .then(        res=>{console.log(res.data)
                       this.setState({addingImage:false})})
                       .catch(err=>{alert("err")})
        }
    }

    }

uploadHandler=(event)=>{

    let images=[]

    for(let i=0; i<event.target.files.length;i++)
         images.push(event.target.files[i]);
    this.setState({
      images:images,
  })
}

submitHandler=(e)=>{
    this.setState({
        addingImage:true,
        imageAdded:true
    })
    e.preventDefault();
}


    render() {
      if(!this.props.authenticated){
        window.location.href=this.props.address;
      }
        return (
            <div className="stage__2--item">
               <form onSubmit={this.submitHandler}>
                  <input className="addCategory__form--name" display="true" type="text" value={this.props.name}/>
                  <label className="addProduct__form--imageLabel" htmlFor={this.props.name}>
                   {
                      <i className="fa fa-camera" aria-hidden="true"></i>
                   }
                  </label>
                  <input required id={this.props.name} className="addProduct__form--image"  type="file" multiple onChange={this.uploadHandler}/>
                 {this.state.addingImage?<Spinner/>:(!this.state.imageAdded?<button className="addCategory__form--btn" type="submit">SUBMIT</button>:"Added")}
               </form>
            </div>
        )
    }
}


export default AddImages
