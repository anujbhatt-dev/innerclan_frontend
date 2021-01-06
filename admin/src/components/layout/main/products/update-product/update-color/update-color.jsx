import React, {Component} from "react"
import Modal from "../../../../../../UI/modal/modal"
import Backdrop from "../../../../../../UI/backdrop/backdrop"
import axios from "axios"
import ReactTooltip from "react-tooltip"
import { withRouter } from "react-router-dom";

 class UpdateColor extends Component{
   state={
     color:"",
     colorId:null,
     show:false,
     loading:false,
     stage:1,
     images:[]
   }

   onChangeHandler=(e)=>{

     let newState= {...this.state}
     newState[e.target.name]=e.target.value
     this.setState({...newState})
   }

   imageHandler=(e)=>{
           let images=[]
           for(let i=0; i<e.target.files.length;i++)
                images.push(e.target.files[i]);
           this.setState({
             images:images,
         })
         return alert("added");
}


   modalToggleHandler=()=>{
     if(this.state.stage===2){
        return alert("please add image to go back")
     }
      console.log("in");
      if(this.state.show){
        this.setState({show:false})
      }else{
        this.setState({show:true})
      }
   }

   onSubmitHandler=(e)=>{
       this.setState({loading:true})
     e.preventDefault();
   }

   componentDidUpdate=()=>{
     if(this.state.loading && (this.state.stage===1)){
       axios.post("/v1/admin/product/addColors/"+this.props.productId,[this.state.color]).then(res=>{
         console.log(res.data);
            this.setState({
              colorId:res.data[0].id,
              loading:false,
              stage:2
            })
       }).catch(err=>{
         if(err.response && err.response.data)
         alert(err.response.data[0])
         else
         alert("something went wrong the team......!!!!")
       })
     }

     if(this.state.loading && (this.state.stage===2)){
        let i = 0
        console.log(("before for"+this.state.images.length));
        for(i=0;i<this.state.images.length;i++){
          let formData = new FormData;
          formData.append("file",this.state.images[i])
          axios.post("/v1/admin/product/addColorImage/"+this.state.colorId,formData).then(res=>{
            console.log(res.data);
          }).catch(err=>{
            if(err.response && err.response.data)
            alert(err.response.data[0])
            else
            alert("something went wrong the team......!!!!")
          })
        }
        this.setState({
          color:'',
          loading:false,
          colorId:null,
          stage:1
        })
        this.props.history.push("/products")
     }
   }


   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let modal =null;
     if(this.state.stage===1){
       modal = <Modal clicked={this.modalToggleHandler} show={this.state.show}>
                     <form onSubmit={this.onSubmitHandler} className="addCategory__form">
                         <input className="addCategory__form--name" onChange={this.onChangeHandler} name="color" value={this.state.color} placeholder="enter a color" type="text"/>
                         <button className="addCategory__form--btn">Add</button>
                     </form>
               </Modal>
     }
     if(this.state.stage===2){
       modal= <Modal clicked={this.modalToggleHandler} show={this.state.show}>
                <form onSubmit={this.onSubmitHandler} className="addCategory__form">
                  <input name="images" className="addCategory__form--name" onChange={this.imageHandler} name="color" data-tip="select one or multiple images" type="file" multiple/>
                  <button className="addCategory__form--btn">Add</button>
                </form>
              </Modal>
     }

     return (

  <>
          <div className="addCategory__form">
          <button className="updateImages" onClick={this.modalToggleHandler}>upload a color</button>
          </div>
          {modal}
          <Backdrop  clicked={this.modalToggleHandler} show={this.state.show}/>

</>
     )
   }
 }


export default withRouter(UpdateColor);
