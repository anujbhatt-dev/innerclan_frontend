 import React, {Component} from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 class Navigation extends Component{

    state={
      categories:[],
      search:""
    }

    onChangeHandler=(e)=>{
     let value = e.target.value
         this.setState({
           search:value
         })
    }

    onKeyPressHandler=(e)=>{
      if(e.key==="Enter"){
        this.props.search(this.state.search)
        this.setState({search:""})
        document.getElementById("searchCheck").checked = false
        document.getElementById("heading").scrollIntoView()
      }
    }

    onClickHandler=()=>{
      this.props.search(this.state.search)
      this.setState({search:""})
      // document.getElementById("heading").scrollIntoView()
    }

   componentDidMount=()=>{
      axios.get("/v1/client/category").then(res=>{
        this.setState({
          categories:[...res.data]
        })
      }).catch(err=>{
        if(err.response && err.response.data[0]){
          toast.error(err.response.data[0]);
        }else{
          toast.error("something went wrong");
        }
      })
   }

   imageClickHandler=()=>{
     window.location.href="http://sheltered-scrubland-77233.herokuapp.com/"
   }

   render(){
     let others=null;
     let men=null;
     let women=null;
     if(this.state.categories.length!==0){
         men = <span  className="nav__list--item">Men
               <span className="dropdown">
                  {this.state.categories.map((category,i)=>{
                    if(category.gender==="MALE"){
                      return <span onClick={()=>this.props.selectedCategoryHandler({
                        id:category.id,
                        name:category.name,
                        gender:category.gender
                      })} key={category.id} className="dropdown__item">{category.name}</span>
                    }
                    return <span key={category.id}></span>
                  })}
               </span></span>
               women = <span href="#heading" className="nav__list--item">Women
                     <span className="dropdown">
                        {this.state.categories.map((category,i)=>{
                          if(category.gender==="FEMALE"){
                            return <span onClick={()=>this.props.selectedCategoryHandler({
                              id:category.id,
                              name:category.name,
                              gender:category.gender
                            })} key={category.id} className="dropdown__item">{category.name}</span>
                          }
                          return <span key={category.id}></span>
                        })}
                     </span></span>
                    others = <span href="#heading" className="nav__list--item">other
                           <span className="dropdown">
                              {this.state.categories.map((category,i)=>{
                                if(category.gender==="UNISEX"){
                                  return <span onClick={()=>this.props.selectedCategoryHandler({
                                    id:category.id,
                                    name:category.name,
                                    gender:category.gender
                                  })} key={category.id} className="dropdown__item">{category.name}</span>
                                }
                                return <span key={category.id}></span>
                              })}
                           </span></span>
     }

     return (
       <nav className="nav">

          <div className="nav__list">
              {men}
              {women}
              {others}
              
          </div>
          <div className="search">
             <input className="search__checkbox" id="searchCheck" type="checkbox"/>
             <input name="search" onChange={this.onChangeHandler} value={this.state.search} onKeyPress={this.onKeyPressHandler} placeholder="Search" className="search__input" type="text"/>
             <label onClick={this.onClickHandler} className="search__label" htmlFor="searchCheck"><i className="search__icon fa fa-search " aria-hidden="true"></i></label>
          </div>
       </nav>
     )
   }
 }


export default Navigation;
