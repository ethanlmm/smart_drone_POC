import React, { Component } from "react";
import { Col, Row, Container, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { properties } from "../../properties";
import { getUserOrders } from "../_actions/orderActions";
import { onCancelRequest } from "../_actions/serviceActions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import BookingUpdateForm from "../Customer/BookingUpdateForm";
const backendurl = properties.backendhost;

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      noOrdersMessage: "",
      modalShow: false,
    };
  }

  onHide = () => this.setState({ modalShow: false });

  componentDidMount() {
      let email = localStorage.getItem("email");
      let data = {
          email:email
      }
    this.props.getUserOrders(data);
  }


  transformDateTime(data) {
      let date = new Date(data)
      return date.toUTCString()  
  }

  onCancelRequest(request_id) {
    let data={
      request_id:request_id
    }
    this.props.onCancelRequest(data);
  }


  render() {
    const  order  = this.props.order;
         
        return (
          <Card style={{ width: '30rem' }}>
           {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
           <Card.Body>
            {/* <Card.Title>Drone Name: {order.droneName}<br/> ServiceName: {order.serviceName}</Card.Title> */}
            <h5 className="text-dark">Drone Name: {order.droneName}<br/> 
            Service Name: {order.serviceName}<br/>
            Drone Status: {order.droneStatus}<br/>
            Service Basecost: {order.serviceBaseCost}</h5>            
             </Card.Body>
              <ListGroup className="list-group-flush">
              <Card.Text>
               <h5 className="text-secondary">
                <ListGroupItem> Service Start Date: {this.transformDateTime(order.serviceStartDate)} </ListGroupItem>
                <ListGroupItem> Service End Date: {this.transformDateTime(order.serviceEndDate)}</ListGroupItem>
                <ListGroupItem> Service Time: {order.serviceTime}</ListGroupItem>
                <ListGroupItem> Number of Sessions: {order.serviceSessionNumber}</ListGroupItem>
                 <ListGroupItem> Request Status: {order.requestStatus}</ListGroupItem>
                <ListGroupItem> Location: {order.address1},{order.address2},{order.city},{order.stateName},{order.zip}</ListGroupItem>
               </h5>
              </Card.Text>
              </ListGroup>  
              <Card.Body>
                <Button
                     onClick={() => this.setState({ modalShow: true })}
                     type="button"
                    >
                    <h5> <i className="fa fa-edit" /></h5>
                </Button>
                     <Modal
                        show={this.state.modalShow}
                        autoFocus={true}
                        fade="false"
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
                        <BookingUpdateForm order={order} />
                       </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.onHide}>Close</Button>
                        </Modal.Footer>
                       </Modal>
                 
              <Button
                onClick={this.onCancelRequest.bind(this, order.request_id)}
                type="button"
                className="btn btn-light mr-1"
              >
               <h5 className="text-danger"><i className=" fa fa-trash" /></h5>
              </Button>
             </Card.Body>
             </Card>       
          );           
    }
  }


  const mapStateToProps = (state) => ({
    orderState: state.orderState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps,{getUserOrders,onCancelRequest})(OrderItem);
  