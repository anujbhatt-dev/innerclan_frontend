import React, {Component} from "react"
import axios from "axios"
import Spinner from "../../../../../UI/spinner/spinner"
import { withRouter } from "react-router-dom"

class UpdateCategory extends Component{

      state={
         id:this.props.history.location.state.id,
         name:this.props.history.location.state.name,
         gender:(this.props.history.location.state.gender==="MALE")?"M":(this.props.history.location.state.gender==="FEMALE")?"F":"U",
         categorySaved:false,
         categorySaving:false,
         savedCategory:{},
         information:[...this.props.history.location.state.info],
         addInfo:"",
         deleting:false
      }

      componentDidUpdate=()=>{
        let newState={
          id:this.state.id,
          name:this.state.name,
          information:this.state.information,
          gender:this.state.gender
        }
        if(this.state.deleting){
          console.log("in delete");
          axios.delete("/v1/admin/category/"+this.state.id)
          .then(res=>{
            alert("you have successfully deleted the catagory");
            this.setState({
                name:"",
                gender:"M",
                savedCategory:{},
                categorySaved:false,
                categorySaving:false,
                information:[],
                addInfo:"",
                deleting:false
            })
          }).catch(err=>{
            this.setState({
                name:"",
                gender:"M",
                categorySaved:false,
                categorySaving:false,
                savedCategory:{},
                deleting:false
            })
            if(err.response && err.response.data)
            alert(err.response.data[0])
            else {
            alert("something went wrong the team......!!!!")
            }
          })
          this.props.history.push("/addCategory",{index:this.props.location.state.index,id:this.state.id})
        }

        if(this.state.categorySaving){
           axios.put("/v1/admin/category/",newState).then(res=>{
             this.setState({
                 name:"",
                 gender:"M",
                 savedCategory:{...res.data},
                 categorySaved:true,
                 categorySaving:false,
                 information:[],
                 addInfo:""
             })
           }).catch(err=>{
             this.setState({
                 name:"",
                 gender:"M",
                 categorySaved:false,
                 categorySaving:false,
                 savedCategory:{}
             })
             if(err.response && err.response.data)
             alert(err.response.data[0])
             else {
             alert("something went wrong the team......!!!!")
             }
           })
           this.props.history.push("/addCategory",{index:this.props.location.state.index,id:this.state.id})
        }
      }

      deleteHandler=(e)=>{
        if(window.confirm("are you sure?")){
          this.setState({deleting:true})
        }else{
          return this.props.history.push("/categories");
        }
        e.preventDefault();
      }

      onChangeHandler=(e)=>{
         const name = e.target.name
         const value = e.target.value
         let prevState={...this.state};
         prevState[name]=value;
         prevState.categorySaved=false;
         this.setState({
           ...prevState
         })
      }

      onSubmitHandler=(e)=>{
          if(e.target.name==="delete"){
             this.setState({deleting:true})
             return;
          }
          this.setState({categorySaving:true})
          e.preventDefault();
      }

      removeInfoHandler=(i)=>{
         let newState= this.state
         newState.information.splice(i,1);
         this.setState({
            ...newState
         })
       }

       addInfoHandler=()=>{
         let newState= this.state
         if(newState.addInfo.length!==0){
           newState.information.push(newState.addInfo);
           newState.addInfo="";
           this.setState({
             ...newState
           })
         }
       }

      render(){
        if(!this.props.authenticated){
          window.location.href=this.props.address;
        }
        // console.log(this.props.history);
         let savedCategory=null
         if(this.state.deleting){
           return <Spinner/>
         }
         if(this.state.categorySaved)
            savedCategory= [<hr className=".verticalHr"/>,<div className="addCategory__savedCategory">
                               <div className="addCategory__savedCategory--name">name</div>
                               <div className="addCategory__savedCategory--gender">male</div>
                                <ul className="addCategory__savedCategory--list">
                                   <li className="addCategory__savedCategory--list-item">information</li>
                                    <li className="addCategory__savedCategory--list-item">information</li>
                                </ul>
                           </div>]


        return (
          <div className="addCategory">
             <form className="addCategory__form" onSubmit={this.onSubmitHandler}>
               <input
               name="name"
               required
               onChange={this.onChangeHandler}
               value={this.state.name}
               className="addCategory__form--name"
               placeholder="product name"
               type="text"/>
               <select
               className="addCategory__form--select"
               onChange={this.onChangeHandler}
               value={this.state.gender}
               name="gender"
               id="gender">
                 <option default className="addCategory__form--select-option" value="M">Male</option>
                 <option className="addCategory__form--select-option" value="F">Felmale</option>
                 <option className="addCategory__form--select-option" value="U">Unisex</option>
               </select>
               <div className="addCategory__form--info">
                       {this.state.information.map((info,i)=>(
                           <div className="addCategory__form--info-parent">
                                 <input
                                 type="text"
                                 className="addCategory__form--info-input"
                                 value={info}
                                 disabled="true"/>
                                 <i onClick={()=>this.removeInfoHandler(i)} className="fa fa-remove addCategory__form--info-remover" aria-hidden="true"></i>
                           </div>
                       ))}
                     <div>
                       <div className="addCategory__form--info-parent">
                           <input
                           type="text"
                           className="addCategory__form--info-input"
                           placeholder="add info"
                           name="addInfo"
                           value={this.state.addInfo}
                           onChange={this.onChangeHandler}
                           />
                         <i onClick={this.addInfoHandler}  className="fa fa-plus addCategory__form--info-adder" aria-hidden="true"></i>
                      </div>
                   </div>
             </div>
             <input name="update" className="addCategory__form--btn" value="update" type="submit"/>
             <button name="delte" style={{background:"red",width:"7.5rem",margin:"0 1rem"}}  onClick={this.deleteHandler} className="addCategory__form--btn" value="delete" type="text">delete</button>
             </form>

             {savedCategory}
          </div>
        )
      }
}


export default  withRouter(UpdateCategory);
