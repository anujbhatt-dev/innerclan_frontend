 import React, {Component} from "react"


 class Backdrop extends Component{

   render(){
     console.log("in backdrop");
     let backdrop=null;
     if(this.props.show){
       backdrop=<div onClick={this.props.clicked} className="backdrop"></div>
     }
     return (
       backdrop
     )
   }
 }


export default Backdrop;
