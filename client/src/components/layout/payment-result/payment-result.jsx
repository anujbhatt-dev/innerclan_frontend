import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class PaymentResult extends Component {



    componentDidMount=()=>{

        console.log(this.props)
        this.props.setAuthorizationHeader("Bearer "+this.props.match.params.jwt,this.props.match.params.email,this.props.match.params.name);
        this.props.history.push("/myOrders");

    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}


export default withRouter(PaymentResult);
