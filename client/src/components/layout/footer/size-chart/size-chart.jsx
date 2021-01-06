import React, {Component} from "react"
import SecondaryNavigation from "../../secondary-nav/secondary-nav"
class SizeChart extends Component{


  componentDidMount=()=>{
    document.getElementById("links").scrollIntoView();
  }

  render(){

    return (
      <>
      <SecondaryNavigation />
      <div className="row">
         <div className="sizeChart"></div>
      </div>
     </>
    )
  }
}


export default SizeChart;
