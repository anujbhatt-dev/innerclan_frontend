import React, {Component} from "react"
import axios from "axios"
import chart from "../../../../assets/images/sizeChart.jpeg"
import Spinner from "../../../../UI/spinner/spinner"
import Modal from "../../../../UI/modal/modal"
import Modal3 from "../../../../UI/modal3/modal3"
import Backdrop from "../../../../UI/backdrop/backdrop"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "react-bootstrap";


class Products extends Component{

   state={
     mounting:true,
     changing:false,
     selectedAngleOfTheImage:0,
     nomatch:false,
     productSize:"M",
     productQuantity:1,
     products:[],
     maxIndex:null,
     selectedIndex:0,
     loading:false,
     show:false,
     caller:false,
     modalProductDetails:
     {
       colors:[{
         images:[{
           image:null
         }]
       }],
       category:{
         information:[]
       }
     }
     ,
     selectedProductId:-1,
     indexOfSelectedProduct:-1,
     selectedImageIndex:0,
     sizeChart:false
   }

    modal3Handler=()=>{
      this.setState({
        sizeChart:!this.state.sizeChart
      })
    }


    loadingHandler=()=>{
      this.setState({loading:true})
    }



    modalToggleHandler=(id,name)=>{
       const indexOfSelectedProduct= this.state.products.findIndex(n=>n.productName===name);
       if(this.state.show){
         this.setState({
           productQuantity:1,
           show:false,
           caller:false,
           selectedProductId:-1,
           indexOfSelectedProduct:-1,
           modalProductDetails:
           {
             colors:[{
               images:[{
                 image:null
               }]
             }],
             category:{
               information:[]
             }
           }
         })
       }else{
         this.setState({
           caller:true,
           show:true,
           selectedProductId:id,
           indexOfSelectedProduct:indexOfSelectedProduct,
           productQuantity:1
         })
       }
    }


   quantityHandler=(count)=>{
      if(count>=1){
        this.setState({
          productQuantity:count
        })
      }else{
        this.setState({
          productQuantity:1
        })
      }
   }


   onChangeHandler=(name)=>{
     if(this.state.loading){
       return null;
     }
      const index = this.state.selectedIndex
      if(name==="minus"){
        if(index!==0){
          this.setState({selectedIndex:index-1})
          this.loadingHandler()
        }
      }
      else if(name==="plus"){
        if(index!==this.state.maxIndex){
          this.setState({selectedIndex:index+1})
          this.loadingHandler()
        }
      }
      document.getElementById("heading").scrollIntoView()
   }

   componentDidMount=()=>{
      axios.get("/v1/product/getProductsOrderByDate/-1/0").then(res=>{
        this.setState({
          products:[...res.data],
          maxIndex:Math.ceil(res.data[0].size/12.0)-1,
          mounting:false
        })
      }).catch(err=>{
        this.setState({
          mounting:false
        })
        if(err.response && err.response.data[0]){
          toast.error(err.response.data[0]);
        }else{
          toast.error("something went wrong mount");
        }
      })
   }

   componentDidUpdate=(prevProps,prevState)=>{
     if(this.props.searchBy){
       axios.get("/v1/product/getProductsBySearch?search="+this.props.searchValue).then(res=>{
               if(res.data.length!==0){
                 this.setState({
                   products:[...res.data],
                   maxIndex:Math.ceil(res.data[0].size/12.0)-1,
                   loading:false,
                   nomatch:false
                 })
               }
               else{
                 this.setState({
                   nomatch:true
                 })
               }
               this.props.selectedCategoryHandler({
                 id:-2,
                 name:this.props.searchValue,
                 gender:null
               })
               this.props.searchHandler("")
          }).catch(err=>{
            this.setState({
              loading:false
              })
              this.props.selectedCategoryHandler({
                id:-2,
                name:this.props.searchValue,
                gender:null
              })
              this.props.searchHandler("")
            if(err.response && err.response.data[0]){
              toast.error(err.response.data[0]);
            }else{
              toast.error("something went wrong search");
            }
          })
     }

     if(this.state.loading){
       axios.get("/v1/product/getProduct"+this.props.sortBy+"/"+this.props.selectedCategory.id+"/"+this.state.selectedIndex).then(res=>{
          this.setState({
              products:[...res.data],
              maxIndex:Math.ceil(res.data[0].size/12.0)-1,
              loading:false
            })
          }).catch(err=>{
            this.setState({
              loading:false
              })
            if(err.response && err.response.data[0]){
              toast.error(err.response.data[0]);
            }else{
              toast.error("something went wrong loading");
            }
          })
        }

         if((this.props.selectedCategory.id!==prevProps.selectedCategory.id && this.props.selectedCategory.id!==-2)){

           this.setState({loading:true,nomatch:false})
         }

         if(this.props.sortBy!==prevProps.sortBy && this.props.selectedCategory.id!==-2){
           this.setState({loading:true,nomatch:false})
         }


         if(this.state.caller){
           axios.get("/v1/product/getProduct/"+this.state.selectedProductId).then(res=>{
                this.setState({
                  modalProductDetails:{...res.data},
                  caller:false,
                  changing:false
                })
          }).catch(err=>{
             this.setState({
               caller:false,
               changing:false
               })
             if(err.response && err.response.data[0]){
               toast.error(err.response.data[0]);
             }else{
               toast.error("something went wrong....!!!!");
             }
           })
         }



}

   arrowHandler=(side)=>{
     this.setState({
       changing:true
     })
     let index = null
     let id = null
     if(side==="left"){
       index =this.state.indexOfSelectedProduct-1
       if(index===-1)
       index=this.state.products.length-1
       id = this.state.products[index].id
       this.setState({
         selectedProductId:id,
         caller:true,
         indexOfSelectedProduct:index,
         productQuantity:1,
         // loading:false
       })
     }
     if(side==="right"){
       index =this.state.indexOfSelectedProduct+1
       if(index===this.state.products.length)
       index=0
       id = this.state.products[index].id
       this.setState({
         selectedProductId:id,
         caller:true,
         indexOfSelectedProduct:index,
         productQuantity:1,
         // loading:false
       })
     }

}

    imageHandler=(i)=>{
       this.setState({selectedImageIndex:i,selectedAngleOfTheImage:0})
    }

    selectedAngleOfTheImageHandler=(i)=>{
       this.setState({selectedAngleOfTheImage:i})
    }

    addCartHandler=()=>{
        let show = this.props.cartHandler({
          productName:this.state.modalProductDetails.productName,
          productPrice:this.state.modalProductDetails.productPrice,
          quantity:this.state.productQuantity,
          size:this.state.productSize,
          selectedProductId:this.state.selectedProductId,
          selectedColorName:this.state.modalProductDetails.colors[this.state.selectedImageIndex].colorName,
          selectedColorId:this.state.modalProductDetails.colors[this.state.selectedImageIndex].id,
          selectedColorImage:this.state.modalProductDetails.colors[this.state.selectedImageIndex].images[0].image})
          if(show){
          this.setState({show:true})
          }
      }


 mouseMoveHandler=(e)=>{
    let coordinates= (e.clientX-450).toString()+"px "+(e.clientY-185).toString()+"px"
    document.getElementById("hoverImage").style.transformOrigin = coordinates;

 }

 mouseLeaveHandler=(e)=>{
   document.getElementById("hoverImage").style.transformOrigin =  "0 0";
 }

   render(){
     let products= null;


    if(this.state.products.length!==0){
       products = <>
                      {this.state.loading?<Spinner/>:this.state.products.map((product,i)=>{

                        return (
                        <div key={product.id} onClick={()=>this.modalToggleHandler(product.id,product.productName)} className="card">
                         <img className="card__image" src={product.defaultImage} alt="thomas"/>

                           <div className="card__details">
                               <div className="card__details-name">
                                    {product.productName}
                               </div>
                               <hr className="card__details-hr"/>
                               <div className="card__details-priceBtn">
                                  {product.productPrice!==product.actualPrice?
                                    <div className="card__details-price">₹{product.productPrice+" "} <span style={{textDecorationLine:"line-through"}}> ₹{product.actualPrice}</span> </div>:
                                    <div className="card__details-price">₹{product.productPrice+" "}</div>
                                  }
                                    <i className="fa fa-shopping-cart card__details-cart" aria-hidden="true"></i>
                               </div>
                            </div>
                        </div>
                      )})}

                  </>
     }


     let modal = null;
      if(this.state.modalProductDetails.colors[0].images[0].image!==null){
       modal= <Modal clicked={this.modalToggleHandler} show={this.state.show}>
              {!this.state.changing?<button  onClick={()=>this.arrowHandler("left")} id="productsTogglerLeft"> {"<"} </button>:null}
               {!this.state.changing?<div className="product">
                   <div className="product__imageBox">
                       <ul className="product__imageBox--angle">
                           {this.state.modalProductDetails.colors[this.state.selectedImageIndex].images.map((image,i)=>(
                             <li key={image.image+i} onClick={()=>{this.selectedAngleOfTheImageHandler(i)}}  className="product__imageBox--angle-item"><img src={image.image} alt="angle-1"/></li>
                           ))}
                       </ul>


                       <div className="product__imageBox--angle-image">
                       <img id="hoverImage" onMouseMove={this.mouseMoveHandler} onMouseLeave={this.mouseLeaveHandler} src={this.state.modalProductDetails.colors[this.state.selectedImageIndex].images[this.state.selectedAngleOfTheImage].image} alt="selected"/>
                       </div>
                   </div>
                   <div className="product__details">
                      <div className="product__details--name">
                          {this.state.modalProductDetails.productName}
                      </div>
                      <div className="product__details--price">
                          {(this.state.modalProductDetails.actualPrice!==this.state.modalProductDetails.productPrice)?
                          [<span key={"span1"} className="product__details--price-actualPrice">₹ {this.state.modalProductDetails.actualPrice}</span>,
                          <span key={"span2"} className="product__details--price-salePrice">₹ {this.state.modalProductDetails.productPrice}</span>,
                          <span key={"span3"} className="product__details--price-savePrice"> Save ₹ {this.state.modalProductDetails.actualPrice-this.state.modalProductDetails.productPrice}</span>]:
                          <span key={"span4"} className="product__details--price-salePrice">₹ {this.state.modalProductDetails.productPrice}</span>
                        }
                      </div>
                      <div className="product__details--similar">
                        {this.state.modalProductDetails.colors.map((color,i)=>(
                          <div onClick={()=>this.imageHandler(i)} key={color.id+i} className="product__details--similar-item">
                              <img src={color.images[0].image} alt={color.colorName}/>
                              <div className="product__details--similar-color">{color.colorName}</div>
                          </div>
                        ))}
                      </div>
                      <div className="product__details--aspect">
                      <div className="nav__list--item product__details--aspect-size">Size : {this.state.productSize}
                      <span className="dropdown">
                          <span onClick={()=>this.setState({productSize:"S"})} className="dropdown__item">S</span>
                          <span onClick={()=>this.setState({productSize:"M"})} className="dropdown__item">M</span>
                          <span onClick={()=>this.setState({productSize:"L"})} className="dropdown__item">L</span>
                          <span onClick={()=>this.setState({productSize:"XL"})} className="dropdown__item">XL</span>
                          <span onClick={()=>this.setState({productSize:"XXL"})} className="dropdown__item">XXL</span>
                      </span></div>
                      <div className="nav__list--item product__details--aspect-quantity">Quantity
                      <span className="dropdown">
                          <span className="dropdown__item">
                             <span onClick={()=>this.quantityHandler(this.state.productQuantity-1)} className="product__details--aspect-quantity--minus">-</span>
                             <span className="product__details--aspect-quantity--amount">{this.state.productQuantity}</span>
                             <span onClick={()=>this.quantityHandler(this.state.productQuantity+1)} className="product__details--aspect-quantity--plus">+</span>
                          </span>
                      </span></div>
                      </div>
                      <div className="product__details--cart">

                    { this.props.cart.findIndex(item=>(item.selectedColorId===this.state.modalProductDetails.colors[this.state.selectedImageIndex].id)&& (item.size===this.state.productSize))===-1
                      ?<div onClick={this.addCartHandler} className="nav__list--item product__details--cart-btn">Add to cart</div>
                      :<div className="nav__list--item product__details--cart-btn">ADDED</div>
                    }
                      </div>
                      <div onClick={this.modal3Handler} style={{margin:"2rem auto"}} className="nav__list--item product__details--cart-btn">SIze chart</div>
                      <div className="product__details--comment">
                          <div className="product__details--comment-head">{this.state.modalProductDetails.comment}</div>
                          <ul className="product__details--comment-list">
                            {this.state.modalProductDetails.category.information.map((info,i)=>(
                              <li key={info+i} className="product__details--comment-item">{info}</li>
                            ))}
                          </ul>
                      </div>
                   </div>
               </div>:<Spinner/>}
               {!this.state.changing?<button  onClick={()=>this.arrowHandler("right")} id="productsTogglerRight">{">"}</button>:null}
         </Modal>
     }

    if(this.state.nomatch){
      return <div id="heading" className="noMatch">
                 <div className="noMatch__text">0 Match found</div>
                 <div  className="noMatch__suggestion">Please try a different search term</div>
             </div>
    }

     return (
       <>
           {modal}
           <Backdrop clicked={this.modalToggleHandler} show={this.state.show}/>
           {this.state.sizeChart?[<Modal3 clicked={this.modal3Handler} show={this.state.sizeChart}>
                <div>
                    <img src={chart} alt=""/>
                </div>

             </Modal3>,<Backdrop clicked={this.modal3Handler} show={this.state.sizeChart}/>]:null}
           <div id="heading" className="heading">
                 <span className="heading__span">{this.props.selectedCategory.name} <sup style={{fontSize:"1rem",letterSpacing:"1px",marginLeft:"-1.5rem"}}>{(this.props.selectedCategory.id!==-1 && this.props.selectedCategory.id!==-2)?((this.props.selectedCategory.gender==="MALE")?"[MEN]":"[WOMEN]"):null}</sup></span>
           </div>

          <div  className="sort">
          {(this.props.selectedCategory.id!==-1 && this.props.selectedCategory.id!==-2)?<div className="nav__list--item">Sort
          <span className="dropdown">
              <span onClick={()=>this.props.sortByHandler("sOrderByDate")} className="dropdown__item">Newest</span>
              <span onClick={()=>this.props.sortByHandler("ByPriceDesc")} className="dropdown__item">₹ high to low</span>
              <span onClick={()=>this.props.sortByHandler("ByPriceAsc")} className="dropdown__item">₹ low to high</span>
              <span onClick={()=>this.props.sortByHandler("ByView")} className="dropdown__item">most viewed</span>
              <span onClick={()=>this.props.sortByHandler("ByBestSelling")} className="dropdown__item">best selling</span>
          </span></div>:null}
           <div className="sort__productCount">{this.state.products.length!==0?this.state.products[0].size+" products":null}</div>
          </div>

          <div div className="feature">
              {this.state.mounting?<Spinner/>:this.props.searchBy?<Spinner/>:products}
          </div>



            <div >
                <div className="pagination">
                     <span onClick={()=>this.onChangeHandler("minus")} className="pagination__minus"> {"-"}</span>
                     <span value={this.selectedIndex} className="pagination__pageNumber"> <span className="pageCount">{this.state.selectedIndex+1}</span>  / <span  className="pageCount">{this.state.maxIndex+1}</span></span>
                     <span onClick={()=>this.onChangeHandler('plus')} className="pagination__plus">{"+"}</span>
                </div>
            </div>
       </>
     )
   }
 }


export default Products;
