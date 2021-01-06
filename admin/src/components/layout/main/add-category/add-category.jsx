 import React, {Component} from "react"
 import axios from "axios";
 import Spinner from "../../../../UI/spinner/spinner"


 class AddCategory extends Component{

   state={
      name:"",
      gender:"M",
      categorySaved:false,
      categorySaving:false,
      savedCategory:{},
      information:[],
      addInfo:""
   }

   componentDidUpdate=()=>{
     let newState =  {
       name:this.state.name,
       gender:this.state.gender,
       information:[... this.state.information],
     }
     if(this.state.categorySaving){
        axios.post("/v1/admin/category",newState).then(res=>{
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
     }
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
       console.log(this.state);
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

      let savedCategory=null
      if(this.state.categorySaved)
         savedCategory= [<hr className=".verticalHr"/>,<div className="addCategory__savedCategory">
                            <div className="addCategory__savedCategory--name">{this.state.savedCategory.name}</div>
                            <div className="addCategory__savedCategory--gender">{(this.state.savedCategory.gender==="M")?"MALE":(this.state.savedCategory.gender==="F")?"FEMALE":"UNISEX"}</div>
                             <ul className="addCategory__savedCategory--list">
                             {this.state.savedCategory.information.map((info,i)=>(
                               <li key={info+i} className="addCategory__savedCategory--list-item">{info}</li>
                             ))}
                             </ul>
                        </div>]

     if(this.state.categorySaving)
        return <Spinner />

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
                        <div key={i} className="addCategory__form--info-parent">
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
          <input className="addCategory__form--btn" value="save" type="submit"/>
          </form>

          {savedCategory}
       </div>
     )
   }
 }


export default AddCategory;
