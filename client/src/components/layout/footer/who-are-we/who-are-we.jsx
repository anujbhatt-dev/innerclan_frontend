 import React, {Component} from "react"
 import SecondaryNavigation from "../../secondary-nav/secondary-nav"


 class WhoAreWe extends Component{


   componentDidMount=()=>{
     document.getElementById("links").scrollIntoView();
   }

   render(){

     return (
       <>
       <SecondaryNavigation />
       <div style={{marginBottom:"15rem"}} className="privacyPolicy">
       <div   className="privacyPolicy__head">
         <h1 className="privacyPolicy__head--h1">who we are</h1>
       </div>
       <div className="privacyPolicy__body">
           <h3  style={{textAlign: "center",marginBottom:"2rem" }}>Woohoo! Welcome to the #Innerclan community!</h3>
           <p>
           Weather its your boredom or your curiosity that has got you here, we are super excited to give you a little insight of Behind the Scenes at InnerClan!
           <br/>
           The idea of InnerClan started during the lockdown when we all were stuck at home due to the Covid-19 pandemic.
           <br/>
           The idea was simple: Create high quality , unique designed products that we, as customers would also want to buy and use ourselves!
           <br/>
           Rather than thinking about the hows and whats of starting a business , we tried to research and figure out things as they came along the way and eventually understood that the best way of learning is by actually doing it.
           <br/>
           We had passion , we were curious and had the correct mindset when we first thought of starting the brand. The mindset of providing unique designs and only the top quality products and attention to detail has allowed us to find success and find our own path as we try and grow into a full brand!
           </p>
       </div>
     </div>
       <div id="cards" className="row">
              <h4>Developers</h4>
              <div className="cards" >
                       <div className="cards__side cards__side--front">
                         <div className="cards__picture cards__picture--1">
                            &nbsp;
                         </div>
                         <h4 className="cards__heading">
                           <span className="cards__heading-span cards__heading-span--1">Sagar Panwar <p>backend developer</p></span>
                        </h4>
                       </div>
                       <div className="cards__side cards__side--back cards__side--back-1">
                         <div className="cards__cta">
                             <div className="cards__detail">
                               <ul>
                                 <li><a href="https://www.linkedin.com/in/sagar-panwar-20a59914b/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                 <li><a href="https://github.com/sagarmachine" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-github" aria-hidden="true"></i></a></li>
                                 <li><a href="https://www.instagram.com/drunken_piglet_00/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                               </ul>
                             </div>
                         </div>
                       </div>
              </div>

              <div className="cards">
                       <div className="cards__side cards__side--front">
                         <div className="cards__picture cards__picture--2">
                            &nbsp;
                         </div>
                         <h4 className="cards__heading">
                           <span className="cards__heading-span cards__heading-span--1">Anuj BhAtt <p>frontend developer</p></span>
                        </h4>
                       </div>
                       <div className="cards__side cards__side--back cards__side--back-1">
                         <div className="cards__cta">
                             <div className="cards__detail">
                               <ul>
                                   <li><a href="https://www.linkedin.com/in/anuj-bhatt-4271051a1/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                   <li><a href="https://github.com/anujbhatt-dev" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-github" aria-hidden="true"></i></a></li>
                                   <li><a href="https://www.instagram.com/bhatt5933/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                               </ul>
                             </div>
                         </div>
                       </div>
              </div>


              <div className="cards">
                       <div className="cards__side cards__side--front">
                         <div className="cards__picture cards__picture--3">
                            &nbsp;
                         </div>
                         <h4 className="cards__heading">
                           <span className="cards__heading-span cards__heading-span--1">Nikhil Khari <p>backend developer</p></span>
                        </h4>
                       </div>
                       <div className="cards__side cards__side--back cards__side--back-1">
                         <div className="cards__cta">
                             <div className="cards__detail">
                               <ul>
                                 <li><a href="https://www.linkedin.com/in/nikhil-khari-0b3830152/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                 <li><a href="https://github.com/NikhilKhari" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-github" aria-hidden="true"></i></a></li>
                                 <li><a href="https://www.instagram.com/nikhil_khari/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                               </ul>
                             </div>
                         </div>
                       </div>
              </div>
          </div>
      </>
     )
   }
 }


export default WhoAreWe;
