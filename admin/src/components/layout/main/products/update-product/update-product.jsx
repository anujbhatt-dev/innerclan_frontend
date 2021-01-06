 import React, {Component} from "react"
import axios from "axios";
import {withRouter} from "react-router-dom"
import ReactTooltip from "react-tooltip"
import UpdateColor from "./update-color/update-color"

 class UpdateProduct extends Component{

   state={
     product:{
       colors:[{
         images:[{image:null}]
       }]
     },
     productDetails:{
       productName:"",
       productPrice:"",
       actualPrice:"",
       defaultImage:"",
       id:null,
       comment:""
     },
     productUpdating:false
   }

   componentDidMount=()=>{
       axios.get("v1/product/getProduct/"+this.props.history.location.state.id).then(res=>{
         console.log(res.data);
         this.setState({
           product:{...res.data},
           productDetails:{
             productName:res.data.productName,
             productPrice:res.data.productPrice,
             actualPrice:res.data.actualPrice,
             id:res.data.id,
             comment:res.data.comment
           }
         })
       }).catch(err=>{
         if(err.response && err.response.data)
         alert(err.response.data[0])
         else
         alert("something went wrong the team......!!!!")
       })
   }


   componentDidUpdate=()=>{
     if(this.state.productUpdating){
       let formData = new FormData();
        formData.append("file",this.state.productDetails.defaultImage);
       const params={
         productName:this.state.productDetails.productName,
         productPrice:this.state.productDetails.productPrice,
         actualPrice:this.state.productDetails.actualPrice,
         defaultImage:this.state.productDetails.defaultImage,
         id:this.state.productDetails.id,
         comment:this.state.productDetails.comment
       }
       axios.put("/v1/admin/product/updateProduct",formData,{params:params})
       .then(res=>{
         let product = {...this.state.product}
         product.defaultImage=res.data.defaultImage
         this.setState({
           productUpdating:false,
           productDetails:{
             productName:res.data.productName,
             productPrice:res.data.productPrice,
             actualPrice:res.data.actualPrice,
             id:res.data.id,
             comment:res.data.comment
           },
            product:product
         })

         alert("successfully updated")
       }).catch(err=>{

         this.setState({
           productUpdating:false
         })
         if(err.response && err.response.data)
         alert(err.response.data[0])
         else
         alert("something went wrong the team......!!!!")
       })
     }
   }

   productDetailsSubmitHandler=(e)=>{
     this.setState({productUpdating:true})
     e.preventDefault()
   }

   productDetailsChangeHandler=(e)=>{
     let newProductDetails={...this.state.productDetails}
     if(e.target.name==="defaultImage"){
        newProductDetails.defaultImage=e.target.files[0];
     }else{
       newProductDetails[e.target.name]=e.target.value
     }
      this.setState({
          productDetails:{...newProductDetails}
      })
   }


   imageDeleteHandler=(id,i,ii)=>{
     if(this.state.product.colors[i].images.length!==1){
          axios.delete("/v1/admin/product/deleteImage/"+id).then(res=>{
            alert("image is deleted successfully")
            let newProduct= {...this.state.product}
            console.log(newProduct);
            newProduct.colors[i].images.splice(ii,1);
            console.log(newProduct);
            this.setState({
               product:{...newProduct}
            })
          }).catch(err=>{
            if(err.response && err.response.data)
            alert(err.response.data[0])
            else
            alert("something went wrong the team......!!!!")
          })
     }else{
       alert("color field can't be empty, you may try deleting color")
     }
   }


   colorDeleteHandler=(id,i)=>{
     if(this.state.product.colors.length!==1){
          axios.delete("/v1/admin/product/deleteColor/"+id).then(res=>{
            alert("color is deleted successfully")
            let newProduct= {...this.state.product}
            console.log(newProduct);
            newProduct.colors.splice(i,1);
            console.log(newProduct);
            this.setState({
               product:{...newProduct}
            })
          }).catch(err=>{
            if(err.response && err.response.data)
            alert(err.response.data[0])
            else
            alert("something went wrong the team......!!!!")
          })
     }else{
       alert("product should atleast one color color")
     }
   }

    productDeleteHandler=()=>{
      if(window.confirm("are you sure?")===true){
        axios.delete("/v1/admin/product/deleteProduct/"+this.state.productDetails.id).then(res=>{
          this.props.history.push("/products")
        }).catch(err=>{
          if(err.response && err.response.data)
          alert(err.response.data[0])
          else
          alert("something went wrong the team......!!!!")
        })
      }
      return ;
    }

   render(){
     console.log(this.props.authenticated);
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let product = null;
     let color = null;
     let updateColor = null;
     // if(Object.keys(this.state.product).length!==0 && this.state.product.colors.length!==0){
        if(this.state.product.colors[0].images[0].image!==null){
        product =<div className="updateProduct__details addCategory__form" >
                  <form className="formFix" onSubmit={this.productDetailsSubmitHandler}>
                     <div className="updateProduct__details-1">
                         <input required data-tip="update product name" onChange={this.productDetailsChangeHandler} name="productName" value={this.state.productDetails.productName} className="updateProduct__details--input addCategory__form--name" type="text"/>
                         <input required data-tip="update product comment" onChange={this.productDetailsChangeHandler} name="comment" value={this.state.productDetails.comment} className="updateProduct__details--input addCategory__form--name" type="text"/>
                         <input required data-tip="update product actual price" onChange={this.productDetailsChangeHandler} name="actualPrice" value={this.state.productDetails.actualPrice} className="updateProduct__details--input addCategory__form--name" type="number"/>
                         <input required data-tip="update product price" onChange={this.productDetailsChangeHandler} name="productPrice" value={this.state.productDetails.productPrice} className="updateProduct__details--input addCategory__form--name" type="number"/>
                         <input required data-tip="update product default image" onChange={this.productDetailsChangeHandler} name="defaultImage"  id="uploadImage" type="file"/>
                     </div><ReactTooltip />
                     <div className="updateProduct__details--image">
                         <img  src={this.state.product.defaultImage} alt={this.state.product.productName}/>
                     </div>
                     <button type="submit" className="products__box--btn">update</button>
                     <button onClick={this.productDeleteHandler} type="submit" className="products__box--btn updateProduct__delete--btn">delete</button>
                  </form>
                 </div>

        color=<div className="updateProduct__color ">
                   {this.state.product.colors.map((color,i)=>(
                       <div className="addCategory__form updateProduct__color--details">
                              <div className="updateProduct__color-1">
                                  <input className="updateProduct__color--details-input addCategory__form--name" value={color.colorName} type="text"/>
                             </div>
                             <div className="updateProduct__color-2">
                                 {color.images.map((image,ii)=>(
                                   <div className="updateProduct__color--details-image">
                                       <img  src={image.image} alt={this.state.product.productName}/>
                                       <button onClick={()=>this.imageDeleteHandler(image.id,i,ii)}  className="products__box--btn">delete</button>
                                   </div>
                                 ))}
                             </div>
                             <button onClick={()=>this.colorDeleteHandler(color.id,i)} type="submit" className="products__box--btn updateProduct__delete--btn">delete</button>
                       </div>
                   ))}
              </div>

          updateColor =   <UpdateColor authenticated={this.props.authenticated}  address={this.props.address}  productId={this.state.product.id}/>
     }


     return (
         <>
         <div className="updateProduct">
               <div className="heading">Product Details</div>
                    {product}
              <div className="heading">Color Details</div>
                    {color}
              {updateColor}
        </div>
         </>
     )
   }
 }


export default withRouter(UpdateProduct);
