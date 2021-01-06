 import React, {Component} from "react"


 class Sidebar extends Component{

   render(){
      let sidebar=null;
     return (
       <div className="sidebar">
                   {this.props.children}
      </div>
     )
   }
 }


export default Sidebar;
