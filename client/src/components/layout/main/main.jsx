import React, {Component} from "react"
import Navigation from "./navigation/navigation"
import BigImage from "./big-image/big-image"
import Products from "./products/products"


class Main extends Component{

  state={

    searchValue:"",
    searchBy:false,
    selectedCategory:{
      id:-1,
      name:"Collection",
      gender:""
    },
    sortBy:"sOrderByDate"

  }

  // componentDidUpdate=()=>{
  //
  // }

   selectedCategoryHandler=(selectedCategory)=>{
       this.setState({
         selectedCategory:selectedCategory
       })
       document.getElementById("heading").scrollIntoView()
   }

   searchHandler=(search)=>{
     if(search!==""){
       this.setState({
         searchValue:search,
         searchBy:true
       })
     }else{
       this.setState({
         searchBy:false
       })
     }
   }

   sortByHandler=(sortBy)=>{
     console.log(sortBy);
     this.setState({
       sortBy:sortBy
     })
   }



  render(){

    return (
       <>
         <Navigation search={this.searchHandler}
         selectedCategoryHandler={this.selectedCategoryHandler}/>
         <BigImage/>
         {/* <div style="width:100%;height:0px;position:relative;padding-bottom:100.000%;"><iframe src="https://streamable.com/e/f1pcwf?autoplay=1&nocontrols=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div> */}

        {/* about us */}

         <div className="sustainibility">
               <div className="sustainibility__heading">About Us</div>
               <div className="sustainibility__content">

                     <span>Inner Clan celebrates the human experience - of being creative and wearing</span>
                     <span>your heart on your sleeve - while being responsible towards the planet.</span>
                     <span>We are a sustainability-conscious fashion brand and pride ourselves on</span>
                     <span>producing premium quality t-shirts in 100% organic</span>
                     <span>cotton inspired by contemporary urban cult</span>


               </div>
        </div>

               {/* //sustainability */}

         <div className="sustainibility">
               <div className="sustainibility__heading">sustainibility</div>
               <div className="sustainibility__content">
                  <span>#theconsciousclan </span>
                  <span>Sustainably sourced organic cotton</span>
                  <span>Organic cotton is better. Period. For the farmers, the environment, and more importantly, for you. </span>
                  <span>Plastic-free packaging </span>
                  <span>We use upcycled newspaper and kraft paper boxes to wrap your t-shirts with plastic-free tape for guilt-free indulgence. </span>
                  <span>Bonus! Wheatgrass seeds</span>
                  <span>The grass that keeps on giving - nutritious, full of antioxidants, anti-inflammatory, and easy to add to your diet.</span>
               </div>
         </div>
         <Products
         cart={this.props.cart}
         cartHandler={this.props.cartHandler}
         selectedCategoryHandler={this.selectedCategoryHandler}
         searchBy={this.state.searchBy}
         searchHandler={this.searchHandler}
         searchValue={this.state.searchValue}
         sortBy={this.state.sortBy}
         selectedCategory={this.state.selectedCategory}
         sortByHandler={this.sortByHandler}/>

       </>
    )
  }
}


export default Main;
