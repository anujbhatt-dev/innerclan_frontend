 import React, {Component} from "react"


 class Backdrop2 extends Component{

   render(){
     let backdrop=null;
     if(this.props.show){
       backdrop=<div onClick={this.props.clicked} className="backdrop2"></div>
     }
     return (
       backdrop
     )
   }
 }


export default Backdrop2;
