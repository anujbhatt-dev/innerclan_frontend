import React, {Component} from "react"
import SecondaryNavigation from "../../secondary-nav/secondary-nav"

class DeliveryAndReturn extends Component{


  componentDidMount=()=>{
    document.getElementById("links").scrollIntoView();
  }

  render(){

    return (
      <>
      <SecondaryNavigation />
      <div className="privacyPolicy">
      <div className="privacyPolicy__head">
        <h1 className="privacyPolicy__head--h1">Delivery and Returns</h1>
      </div>
      <div className="privacyPolicy__body">
          <h3 style={{textAlign: "center"}}>DELIVERIES, RETURNS &amp; EXCHANGES</h3>
          <h2>Deliveries</h2>
          <p><strong>COVID-19 SHIPPING ALERT: Staying in line with the current situation in various parts of the country, there might be a delay in delivering your orders as most of our courier partners have halted operations while others are short staffed. We are constantly monitoring the situation and working with our courier partners to get your orders delivered as soon as possible. We request you to please bear with us in this challenging situation.</strong></p>
          <p>At inner clan, we combine efficient shipping services to enhance the shopping experience for all our customers. Our services include thorough inspection of the products, top quality packaging, insurance for the packages, fast &amp; on-time delivery and timely communication at each stage of the shipping process.</p>
          <p>We believe that shipping is an integral part of an online shopping experience. After purchasing merchandise online, the main question that comes to your mind is “When will I receive my order?” At inner clan, we are committed to ensure that the products you purchase are delivery in an organised and timely manner.</p>
          <p>Each order received is processed within<span><strong>&nbsp;4-5 business days</strong></span><span>&nbsp;</span>and you will be intimated along each step of the way i.e. when the order is placed, processed, shipped and delivered. A tracking link will be shared with the customer once the order is in transit. Order will then reach it's destination within <strong>4-6&nbsp;business days</strong>. We are partners with the top most courier and logistics service providers in the country and want to ensure that you receive your order on-time and safely. In case you have any questions in regards to order delivery, you can contact us and we will resolve all your problems right away.</p>
          <p>From the time the order is placed you can expect the order to be at your door:</p>
          <p><strong>9-12 business days</strong></p>
          <p>&nbsp;</p>
          <h2>Returns</h2>
          <p>We want you to be happy with your purchase. If you have any concerns, please contact us with your order number (found on the email receipt), and we will work with you to make it right! Please keep in mind when returning items there is a return shipping fee of <strong>Rs. 100</strong> that has to be borne by the customer, by purchasing from our website you agree to pay this fee for any return for any reason.</p>
          <p><strong>PLEASE NOTE:</strong> Masks are not returnable due to the nature of the product; for sanitary purposes, we cannot allow any returns.</p>
          <p>&nbsp;</p>
          <h2>Exchanges</h2>
          <p>We understand that your apparel might not be the perfect fit on the first try. Our exchange policy lasts 14 days. <strong>Rs 150/-</strong> charge will be applied to all exchange requests as both tasks of return pick up as well as reshipping have to be performed by our shipping team.</p>
      </div>
    </div>
     </>
    )
  }
}


export default DeliveryAndReturn;
