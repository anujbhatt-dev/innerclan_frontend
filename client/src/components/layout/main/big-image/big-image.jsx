 import React, {Component} from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pic from "../../../../assets/images/innerclan_page-0001.jpg"

import { Carousel } from "react-bootstrap"


 class BigImage extends Component{

  state={
    arr:[]
  }

  componentDidMount=()=>{
    axios.get("/v1/client/ui").then(res=>{
         this.setState({
           arr:res.data
         })
    }).catch(err=>{
      if(err.response && err.response.data[0]){
        toast.error(err.response.data[0]);
      }else{
        toast.error("something went wrong");
      }
    })
    }

   render(){

     return (
       <Carousel className="carousel">
          {this.state.arr.map((item,i)=>{
            if(i===this.state.arr.length-1){
              return null
            }
            return  <Carousel.Item  className="carousel__item">
                      <img
                        className="d-block w-100 carousel__item-img"
                        src={item.image}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3 className="carousel__item-h3">{item.quote}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
          })}
      </Carousel>
     )
   }
 }


export default BigImage;
