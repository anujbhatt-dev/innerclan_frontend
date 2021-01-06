 import React, {Component} from "react"


 class Modal2 extends Component{




   render(){
     let modal=null
     if(this.props.show){
       modal=<div
        className="modal2">
                  {this.props.children}
                  <i onClick={this.props.clicked} className="fa fa-times modalCross" aria-hidden="true"></i>
              </div>
     }
     return (
         modal
     )
   }
 }


export default Modal2;
