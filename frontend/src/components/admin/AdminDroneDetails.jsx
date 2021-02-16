import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import {Col, Row, Form, Modal } from "react-bootstrap";

import { connect } from "react-redux";
import { updateDrone,removeDrone } from "../_actions/droneActions";
import UpdateDroneForm from "../admin/UpdateDroneForm";

import "../../css/AdminDroneDetails.css";

const styles = {
  cardImage: {
    
    objectFit: 'cover',
    height:"auto"
  },
  imgContainer: {
    height: "10px"
  }
}

class AdminDroneDetails extends Component {
  
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
          powerconsumption:"",
          modalShow:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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

onHide = () => this.setState({ modalShow: false });

handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*handleImageChange = (e) => {
    console.log("files to upload: " , e.target.files[0]);
    const file =  e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }*/

  handleImageChange = (e) => {
    console.log("files to upload: " , e.currentTarget.files[0]);
    
    //const file =  e.currentTarget.files[0];
    this.setState({ image: e.currentTarget.files[0] }, () => { console.log("files: " + this.state.image) });

    
  }

  _handleReaderLoaded = (readerEvt) => {
    const binaryString = readerEvt.target.result
    this.setState({
      base64TextString : btoa(binaryString)
    })
  }

  handleSubmit = (e,drone_id) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

  
      const data = {
        name: this.state.name,
        size: this.state.size,
        type: this.state.type,
        description: this.state.description,
        //image:this.state.base64TextString,
        image:this.state.image,
        imageUrl:this.state.imageUrl,
        softwarespecs: this.state.softwarespecs,
          hardwarespecs: this.state.hardwarespecs,
          wingspan:this.state.wingspan,
          weight:this.state.weight,
          battery:this.state.battery,
          camera:this.state.camera,
          flighttime:this.state.flighttime,
          flightrange:this.state.flightrange,
          flightaltitude:this.state.flightaltitude,
          flightspeed:this.state.flightspeed,
          flightplanningsoftware:this.state.flightplanningsoftware,
          imagesoftware:this.state.imagesoftware,
          powerconsumption:this.state.powerconsumption,
        id:drone_id
      };

      this.props.updateDrone(data);
    
      setTimeout(() => {   this.props.history.push("/main/admin/viewalldrones"); }, 1000);
  };

  handleAgricultureServices = (e,dronedetails) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/adminservicecatalog",dronedetails);
    
  };

  createAgricultureService = (e,dronedetails) => {
   this.props.history.push("/main/createservice",dronedetails);
    
  };

  handleDeleteDrone = (e,drone_id) => {
    //prevent page from refresh
   // e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

      const params = {
        id:drone_id
      };

      this.props.removeDrone(params);

      setTimeout(() => {   this.props.history.push("/main/admin/viewalldrones"); }, 1000);

     
   };

  

  render() {
   const dronedetails = this.props.location.state;

   var imageuri = null;
   var droneidparam = null;
   var type = null;

   [dronedetails].map(dronedetails => 
   //imageuri ="data:image/png[jpg][jpeg];base64," + dronedetails.image,

  type = dronedetails.type,
   
   imageuri=dronedetails.image,
   droneidparam = dronedetails.drone_id
   )

   if(type === "datacollection") {
    type = "Data Collection";
  } else if(type === "spreading") {
     type = "Agriculture Spreading";
  } else if(type === "monitoring"){
    type = "Monitoring";
  } else {
    type = "Spraying";
  }

   if(imageuri != null || imageuri != undefined)
   imageuri = imageuri.replace(/"/g, '');


  //console.log("image url:" + imageuri);
  
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
          <div className="buttonDiv">

<Button
      style={{margin: "30px"}}
      className="btn btn-primary buttonTop" type="submit"
      onClick={() => this.setState({ modalShow: true })}>
     <b> Update Drone</b>
    </Button>


    <Modal
    show={this.state.modalShow}
    autoFocus="true"
    fade={false}
    onHide={this.onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Update Drone
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UpdateDroneForm drone={dronedetails} drone_id={dronedetails.drone_id}/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>



    <Button
      style={{margin: "30px"}}
      className="btn btn-primary buttonTop" type="submit"
      onClick={(e) => this.handleAgricultureServices(e,dronedetails)}>
     <b> View Services</b>
    </Button>

    <Button
      style={{margin: "30px"}}
      className="btn btn-primary buttonTop" type="submit"
      onClick={(e) => this.createAgricultureService(e,dronedetails)}>
     <b> Create Service</b>
    </Button>

    <Button
      style={{margin: "30px"}}
      className="btn btn-danger buttonTop" type="submit"
      onClick={e => this.handleDeleteDrone(e,droneidparam)}>
      <b>Remove Drone</b>
    </Button>
    
    </div>


          </Row>


          </Card.Body>
          </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link"  eventKey="0">
                <h5 className="text-bold text-dark "><u> Hardware Specifications</u></h5>
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
                <h5 className="text-bold text-dark"><u> Flight Parameters</u></h5>
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
                <h5 className="text-bold text-dark"><u> Software Specifications</u></h5>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
               <Card.Text><h5><b>Flight Planning Software : </b>{dronedetails.flightplanningsoftware || "Not Specified"}</h5></Card.Text>
               <Card.Text><h5><b>Image Software : </b>{dronedetails.imagesoftware || "Not Specified"}</h5></Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
         
          {/*  <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Delete Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                <h4 class="card-title">Are you sure you want to delete this drone from the catalog?</h4>
                  
                  <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleDeleteDrone(e,droneidparam)}>
                Remove Drone
              </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Agriculture Services
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                View All Agriculture Services
              </Button>

              <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.createAgricultureService(e,dronedetails)}>
                Create Agriculture Service
              </Button>
                </Card.Body>
              </Accordion.Collapse>
          </Card>*/}
          
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

export default connect(mapStateToProps, { updateDrone,removeDrone})(AdminDroneDetails);