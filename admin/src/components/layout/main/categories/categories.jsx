 import React, {Component} from "react"
import axios from "axios"
import Category from "./category/category"
import Spinner from "../../../../UI/spinner/spinner"

 class Categories extends Component{

   state={
       categories:[],
       populating:false
   }


   componentDidMount=()=>{
     this.setState({
       populating:true
     })
       axios.get("/v1/admin/category/").then(res=>{
         console.log(res.data);
         this.setState({
           categories:[...res.data],
           populating:false
         })
        }).catch(err=>{
           if(err.response  && err.response.data){
             alert(err.response.data[0])
           }else{
             alert('something went wrong......!!!!')
           }
         })
   }

   render(){
     if(!this.props.authenticated){
       window.location.href=this.props.address;
     }

     let categories = null
     if(this.state.populating){
       return <Spinner />
     }
     if(this.state.categories.length===0){
          categories= <div>you do not have any catagory saved</div>
       console.log("in  ",this.state.categories.length);
     }else{
       categories  = <>{this.state.categories.map((category,i)=>{
        return (<Category authenticated={this.props.authenticated}   address={this.props.address}  categoryIndex={i} key={category.name+category.id} categoryGender={category.gender} categoryId={category.id} categoryName={category.name} categoryInfo={category.information} />)
       })}</>
     }

     console.log(this.props);
     return (
        <div className="categories">
              <div className="search categories__search">
                 <input className="search__checkbox" id="search" type="checkbox"/>
                 <input placeholder="Search" className="search__input" type="text"/>
                 <label className="search__label" htmlFor="search"><i className="search__icon fa fa-search " aria-hidden="true"></i></label>
              </div>
               {categories}
        </div>
     )
   }
 }


export default Categories;
