import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import { Nav,Navbar,Col, Row, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { updateDrone,removeDrone } from "../_actions/droneActions";

const styles = {
  cardImage: {
    
    objectFit: 'cover',
    height:"auto"
  },
  imgContainer: {
    height: "10px"
  }
}

class CustomerDroneDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      size: "",
      type: "",
      description: "",
      base64TextString:"",
      setImage:false,
      image:null,
      imageUrl:"",
      softwarespecs: "",
          hardwarespecs: "",
          wingspan:"",
          weight:"",
          battery:"",
          camera:"",
          flighttime:"",
          flightrange:"",
          flightaltitude:"",
          flightspeed:"",
          flightplanningsoftware:"",
          imagesoftware:"",
          powerconsumption:""
    };
    this.handleChange = this.handleChange.bind(this);
}

componentDidMount(){
  const dronedet = this.props.location.state;
  console.log("drone details image :" + dronedet.image);
  [dronedet].map(dronedet => 
      this.setState({
          name:dronedet.name,
          description:dronedet.description,
          size:dronedet.size,
          type:dronedet.type,
          imageUrl:dronedet.image,
          hardwarespecs:dronedet.hardwarespecs,
          softwarespecs:dronedet.softwarespecs,
          wingspan:dronedet.wingspan,
          weight:dronedet.weight,
          battery:dronedet.battery,
          camera:dronedet.camera,
          flighttime:dronedet.flighttime,
          flightrange:dronedet.flightrange,
          flightaltitude:dronedet.flightaltitude,
          flightspeed:dronedet.flightspeed,
          flightplanningsoftware:dronedet.flightplanningsoftware,
          imagesoftware:dronedet.imagesoftware,
          powerconsumption:dronedet.powerconsumption,
        })
  )
}

handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

 

 

  handleAgricultureServices = (e,drone_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/customerservicecatalog",drone_id);
    
  };

  

  render() {
   const dronedetails = this.props.location.state;

   var imageuri = null;
   var droneidparam = null;
   var type = null;

   [dronedetails].map(dronedetails => 
   //imageuri ="data:image/png[jpg][jpeg];base64," + dronedetails.image,
   
   imageuri=dronedetails.image,
   droneidparam = dronedetails.drone_id,
   type = dronedetails.type
   )

   if(imageuri != null || imageuri != undefined)
   imageuri = imageuri.replace(/"/g, '');

   if(type === "datacollection") {
    type = "Data Collection";
  } else if(type === "spreading") {
     type = "Agriculture Spreading";
  } else if(type === "monitoring"){
    type = "Monitoring";
  } else {
    type = "Spraying";
  }


  console.log("image url:" + imageuri);
  
   return(

     
     
    <div class="container">
    <div class="row justify-content-center">
      
        <div class="col-md-12">
                <div class="card">
                    <div class="card-header"></div>
                    <div class="card-body">
        {[dronedetails].map(dronedetails => <div>
          <Accordion>
          <Card className="m-1 border-0 shadow">
         
        
         <Card.Body>
         <div class="card-block text-center">
         <h1 class="card-title">{dronedetails.name}</h1>
          
       </div>
         
         <Row>

         <Col>
         <Card.Img variant="top" src={imageuri} style={styles.cardImage}/></Col>
         <Col>
         <Card.Text>
            <h5><b>Size : </b>{dronedetails.size}</h5>
            <h5>{type} drone.</h5>
            <h5><b>{dronedetails.description}</b></h5>
         </Card.Text>
         </Col>
         </Row>

         </Card.Body>
         </Card>

           <Card>
             <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="0">
               <h5 className="text-bold text-info"> Hardware Specifications</h5>
               </Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="0">
               <Card.Body>
              <Card.Text><h5><b>WingSpan : </b>{dronedetails.wingspan || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Weight : </b>{dronedetails.weight || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Battery : </b>{dronedetails.battery || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Camera :</b> {dronedetails.camera || "Not Specified"}</h5></Card.Text>
               <Card.Text><h5><b>Power Consumption :</b> {dronedetails.powerconsumption || "Not Specified"}</h5></Card.Text>
               </Card.Body>
             </Accordion.Collapse>
           </Card>

           <Card>
             <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="1">
               <h5 className="text-bold text-info"> Flight Parameters</h5>
               </Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="1">
               <Card.Body>
              <Card.Text><h5><b>Flight Time : </b>{dronedetails.flighttime || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Flight Altitude :</b>{dronedetails.flightaltitude || "Not Specified"}</h5> </Card.Text>
              <Card.Text><h5><b>Flight Range :</b> {dronedetails.flightrange || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Flight Speed :</b>{dronedetails.flightspeed || "Not Specified"}</h5> </Card.Text>
               </Card.Body>
             </Accordion.Collapse>
           </Card>

           <Card>
             <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="2">
               <h5 className="text-bold text-info"> Software Specifications</h5>
               </Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="2">
               <Card.Body>
              <Card.Text><h5><b>Flight Planning Software : </b>{dronedetails.flightplanningsoftware || "Not Specified"}</h5></Card.Text>
              <Card.Text><h5><b>Image Software : </b>{dronedetails.imagesoftware || "Not Specified"}</h5></Card.Text>
               </Card.Body>
             </Accordion.Collapse>
           </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3" onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                <h5 className="text-bold text-info"> Services</h5>
                </Accordion.Toggle>
              </Card.Header>
             
            </Card>
          </Accordion>
          </div>)}
          </div>
                          </div>
                  </div>
              </div>
          </div>
   )
   
  }
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
});

export default connect(mapStateToProps, {})(CustomerDroneDetails);