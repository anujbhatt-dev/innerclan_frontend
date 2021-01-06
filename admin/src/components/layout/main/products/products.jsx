 import React, {Component} from "react"
import axios from "axios";
import {Link} from "react-router-dom";


 class Products extends Component{

   state={
     products:[]
   }

   componentDidMount=()=>{
     axios.get("/v1/admin/product/getProductsOrderByDate/-1/0").then(res=>{
       console.log(res.data)
       this.setState({
         products:[...res.data]
       })
     }).catch(err=>{
       if(err.response && err.response.data)
       alert(err.response.data[0])
       else {
       alert("something went wrong the team......!!!!")
     }
   })
}

productDeleteHandler=(id)=>{
  if(window.confirm("are you sure?")===true){
    axios.delete("/v1/admin/product/deleteProduct/"+id).then(res=>{
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
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }
     let products=null;
     if(this.state.products.length!==0){
       products=
       <div className="products">
           {this.state.products.map((product,i)=>(
             <div className="products__box">
                <div className="products__box--details">
                     <div className="products__box--details-item">Product Name:  <span className="products__box--details-span">{product.productName}</span></div>
                     <div className="products__box--details-item">Comment: <span className="products__box--details-span"> {product.comment}</span></div>
                     <div className="products__box--details-item">Actual Price:  <span className="products__box--details-span">{product.actualPrice}</span></div>
                     <div className="products__box--details-item">Product Price:  <span className="products__box--details-span">{product.productPrice}</span></div>
                     <div className="products__box--details-item">Created On:  <span className="products__box--details-span">{product.createdOn}</span></div>
                     <div className="products__box--details-item">Updated On:  <span className="products__box--details-span">{product.updatedOn}</span></div>
                     <div className="products__box--details-item">Sale:  <span className="products__box--details-span">{product.sale}</span></div>
                     <div className="products__box--details-item">Views:  <span className="products__box--details-span">{product.view}</span></div>
                </div>
                {console.log(product)}
                <div className="products__box--image">
                    <img src={product.defaultImage} alt=""/>
                </div>
                <Link to={{
                  pathname:"/updateProduct",
                  state:{
                    id:product.id
                  }
                }}>
                <button onClick={()=>this.productDeleteHandler(product.id)} type="submit" className="products__box--btn updateProduct__delete--btn">delete</button>
                <button className="products__box--btn">update</button></Link>
             </div>
           ))}
       </div>
     }

     return (
       <><div className="search categories__search products__search">
          <input className="search__checkbox" id="search" type="checkbox"/>
          <input placeholder="Search" className="search__input" type="text"/>
          <label className="search__label" htmlFor="search"><i className="search__icon fa fa-search " aria-hidden="true"></i></label>
       </div>
        {products}
      </>
     )
   }
 }


export default Products;
