 import React, {Component} from "react"


 class ErrorBoundary extends Component{

   state={
     hasError:false
   }

   componentDidCatch=(err,info)=>{
     this.setState({hasError:true})
   }

   render(){

     let error =null
     if(this.state.hasError){
       error=<div style={{height:"96vh",fontSize:"3rem",display:"flex",justifyContent:"center",alignItems:"center",color:"#3398cc"}} className="privacyPolicy__head--h1">SOMETHING WENT WRONG!</div>
     }else{
       error=this.props.children
     }


     return (
       error
     )
   }
 }


export default ErrorBoundary;
