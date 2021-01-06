import React, { Component } from 'react'
import axios from 'axios'

class AddColor extends Component {


    state={
        colors:[],
        addingColors:false,
        addColor:""
    }

    onChangeHandler=(e)=>{
       const name = e.target.name
       const value = e.target.value
       let prevState={...this.state};
       prevState[name]=value;
       this.setState({
         ...prevState
       })
    }


    removeColorHandler=(i)=>{
       let newState= this.state
       newState.colors.splice(i,1);
       this.setState({
          ...newState
       })
     }

     addColorHandler=()=>{
       let newState= this.state
       if(newState.addColor.length!==0){
         newState.colors.push(newState.addColor);
         newState.addColor="";
         this.setState({
           ...newState
         })
       }
     }


    componentDidUpdate=()=>{
        if(this.state.addingColors){
            let productId=this.props.productId;
            console.log(this.state.colors.length);
        axios.post("/v1/admin/product/addColors/"+productId,this.state.colors).
        then(res=>{
            console.log(res.data);
            this.setState({
                addingColors:false
            })
            this.props.colorsSaved(res.data);
        }).
        catch(err=>{
            if(err.response && err.response.data)
            alert(err.response.data[0])
            else
            alert("contact the team")
            this.setState({
                addingColors:false
            })
        })
    }
}


    submitHandler=()=>{
      console.log("add color");
        this.setState({
            addingColors:true,
        })
    }

    // onChangeHandler=()=>{
    //     newCo
    // }





    render() {
      if(!this.props.authenticated){
        window.location.href=this.props.address;
      }
        return (
            <div>
                  <div className="addCategory__form--info">
                          {this.state.colors.map((color,i)=>(
                              <div key={i} className="addCategory__form--info-parent">
                                    <input
                                    type="text"
                                    className="addCategory__form--info-input"
                                    value={color}
                                    disabled="true"/>
                                    <i onClick={()=>this.removeColorHandler(i)} className="fa fa-remove addCategory__form--info-remover" aria-hidden="true"></i>
                              </div>
                          ))}
                        <div>
                          <div className="addCategory__form--info-parent">
                              <input
                              type="text"
                              className="addCategory__form--info-input"
                              placeholder="add color"
                              name="addColor"
                              value={this.state.addColor}
                              onChange={this.onChangeHandler}
                              />
                            <i onClick={this.addColorHandler}  className="fa fa-plus addCategory__form--info-adder" aria-hidden="true"></i>
                         </div>
                      </div>
                </div>
                <input onClick={this.submitHandler} className="addProduct__form--btn" value="save" type="submit"/>
            </div>
        )
    }
}


export default  AddColor
