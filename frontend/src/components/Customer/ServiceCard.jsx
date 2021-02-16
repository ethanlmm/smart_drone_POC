import React, { Component} from "react";
import { connect } from "react-redux";
import { Card, Button, Col , Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookDroneService } from "../_actions/serviceActions";
import Modal from "react-bootstrap/Modal";
import sprayingservice from "../../common/images/sprayingservice.png";
import fieldmapping from "../../common/images/fieldmapping.png";
import ServiceBookingForm from "../Customer/ServiceBookingForm";
import swal from "sweetalert";
 
class ServiceCard extends Component {
  constructor(props) {
  super(props);
  this.state={
    drone_id:"",
    service_id:"",
    user_email:"",
    name:"",
    description:"",
    basecost:"",
    date:"",
    sessionTime:"15",
    sessionNumber:"1",
    added:false,
    open: false,
    modalShow: false,
    blockScroll: true,
  };
}

onHide = () => this.setState({ modalShow: false });


  render() {
    const{drone_id}=this.props;
    const user_email =localStorage.getItem("email");
    console.log("modalshow is"+ this.state.modalShow);
    return(
      <Card bg="white" style={{ width: "30rem", margin: "1rem" }}>
      <Card.Img variant="top" src={fieldmapping} />
         {/* <Card.Body><Card.Img variant="top" src={this.props.product.imageURL} /> */}
          <Col>
            <Card.Title> <b>Service Name: </b> {this.props.service.name} </Card.Title>
            <Card.Text>
             <h5> <b>Description: </b>
              {this.props.service.description}</h5>
            </Card.Text>
            <Card.Text>
             <h5> <b>Basecost: </b> ${this.props.service.basecost} </h5>
            </Card.Text>
            <Button
                variant="primary"
               // disabled={this.state.added}
               onClick={() => this.setState({ modalShow: true })}
            
              >
                <b>Book Drone Service</b>
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
                  Service Booking
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ServiceBookingForm service={this.props.service} drone_id={drone_id} email={user_email} />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
            </Col>         
            <Col><br/></Col>
          </Card>
    )}
    }

const mapStateToProps =(state)=>({
    droneState:state.droneState,
    serviceState:state.serviceState,
    errorState:state.errorState
  
  })
  
  
export default connect(mapStateToProps,{bookDroneService}) (ServiceCard);