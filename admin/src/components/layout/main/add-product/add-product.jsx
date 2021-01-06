 import React, {Component} from "react"
import axios from "axios"
import AddColor from "./add-color/add_color"
import AddImages from "./add-color/add-image/add_image"


 class AddProduct extends Component{

    state={
       productForm:{
         productName:"",
         comment:"",
         actualPrice:"",
         productPrice:"",
         image:"",
         category:""
       },
       stage:0,
       savingProduct:false,
       savedProduct:null,
       savedColors:[],
       categories:[]
    }




    componentDidUpdate=()=>{

      if(this.state.savingProduct){
       let params={
        productName:this.state.productForm.productName,
        comment:this.state.productForm.comment,
        actualPrice:this.state.productForm.actualPrice,
        productPrice:this.state.productForm.productPrice,
       }
       const formData= new FormData();
       formData.append("file",this.state.productForm.image);
        axios.post("/v1/admin/product/addProduct/"+this.state.productForm.category,formData,{
          params:params
        })
        .then(res=>{
                    // console.log(res.data);
                     this.setState({savingProduct:false,stage:1,savedProduct:res.data});
        }).
        catch(err=>{
          // console.log(err)
          alert(err.response.data[0]);
          this.setState({savingProduct:false});

        })
      }
    }

    componentDidMount=()=>{
    axios.get("/v1/admin/category").
    then(res=>{
      // console.log(res.data);
      this.setState({categories:res.data});
       }).
    catch(err=>{
      alert("error");
    })
    }

    colorsSaved=(colors)=>{
      this.setState({
        stage:2,
        savedColors:colors
      })

      // console.log(this.state.savedColors);
    }


    onChangeHandler=(e)=>{
       const name= e.target.name
       const value= e.target.value
       let prevState = {...this.state}
       prevState.productForm[name]=value
       this.setState({
           ...prevState
       })
    }

    onSubmitHandler=(e)=>{
       // console.log(this.state);
       e.preventDefault();
this.setState({savingProduct:true})
    }

    imageUploadHandler=(e)=>{

      let newProductForm={... this.state.productForm};
      newProductForm.image=e.target.files[0];

      this.setState({
        productForm: newProductForm,
    });
    }

    imageSavedHandler=()=>{
      this.setState({
        stage:0,
        productForm:{
          productName:"",
          comment:"",
          actualPrice:"",
          productPrice:"",
          image:"",
          catagory:""
        }
      })
    }

   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let categories = null;
     if(this.state.categories.length!==0){
       categories = <select
       className="addCategory__form--select"
       onChange={this.onChangeHandler}
       value={this.state.productForm.category}
       name="category"
       id="gender">
       <option className="addCategory__form--select-option">{ "select category"}</option>
       {this.state.categories.map((category,i)=>{
        return <option key={category.id} className="addCategory__form--select-option" value={category.id}>{ category.name+"---"+category.gender}</option>
       })}
       </select>
     }

     let header=(
       <div className="addProduct">
          <form className="addProduct__form" onSubmit={this.onSubmitHandler}>
               <input
               name="productName"
               required
               onChange={this.onChangeHandler}
               value={this.state.productForm.productName}
               className="addProduct__form--name"
               placeholder="product name" type="text"/>
               <input
               name="comment"
               required
               onChange={this.onChangeHandler}
               value={this.state.productForm.comment}
               className="addProduct__form--name"
               placeholder="product comment"
               type="text"/>
               <input
               name="actualPrice"
               required
               onChange={this.onChangeHandler}
               value={this.state.productForm.actualPrice}
               className="addProduct__form--name"
               placeholder="₹ product actual price"
               type="text"/>
               <input
               name="productPrice"
               required
               onChange={this.onChangeHandler}
               value={this.state.productForm.productPrice}
               className="addProduct__form--name"
               placeholder="product price"
               type="text"/>
               {categories}
               <label className="addProduct__form--imageLabel" htmlFor="productFormImage">
                {
                  <i className="fa fa-camera" aria-hidden="true"></i>
                }
               </label>
               <input
               id="productFormImage"
               required
               onChange={this.imageUploadHandler}
               className="addProduct__form--image"
               placeholder="product image"
               type="file"/>
               <input className="addProduct__form--btn" value="save" type="submit"/>
          </form>
       </div>
     )

     if(this.state.stage==1)
     header=(
      <div className="">
         <input disabled="true" className="addProduct__form--name" value={this.state.savedProduct.productName}/>
         <img className="stage__image" src={this.state.savedProduct.defaultImage} alt="productImage"/>
        <AddColor authenticated={this.props.authenticated}   address={this.props.address}  productId={this.state.savedProduct.id} colorsSaved={this.colorsSaved}/>
      </div>
     )
     else if(this.state.stage==2)
     header=(<div className="stage">
        <div>
          <input disabled="true" className="addProduct__form--name"  type="text" value={this.state.savedProduct.productName}/>
          <input  disabled="true" className="addProduct__form--name"  type="text" value={this.state.savedProduct.id}/>
          <img className="stage__image" src={this.state.savedProduct.defaultImage} alt="productImage"/>
      </div>
        <div  className="stage__2">
            {this.state.savedColors.map(color=>
                <AddImages authenticated={this.props.authenticated}   address={this.props.address}  id={color.id} name={color.colorName}/>
            )}
        </div>
      </div>
     )

     if(this.state.categories.length===0)
     header=<h2>You don't have any category saved</h2>

     return header
   }
 }


export default AddProduct;
