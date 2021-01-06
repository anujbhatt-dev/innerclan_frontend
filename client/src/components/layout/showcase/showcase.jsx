import React, { Component } from 'react'
import showcase from "../../../assets/images/showcase.jpg"
import showcase2 from "../../../assets/images/showcase2.jpg"
import axios from 'axios';
import $ from "jquery"

class Showcase extends Component {


    state={
        data:[],
            }

    componentDidMount=()=>{
        window.scrollTo({top:0,behavior:"smooth"})
        axios.get("/v1/client/ui/showcase").
        then(res=>this.setState({data:res.data}));
    }
    render() {

        return (
            <div className="showcase">

                <div className="showcase__grid">
                     {this.state.data.map((d,i)=>

                        <img className="showcase__grid_img" src={d.image} alt=""/>
                     )}
                </div>

            </div>
        )
    }
}


export default Showcase;
