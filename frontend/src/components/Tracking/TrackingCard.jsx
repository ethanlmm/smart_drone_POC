import React, { Component} from "react";

import { Card, ListGroup, ListGroupItem, Button, Col , Row} from "react-bootstrap";
 
class TrackingCard extends Component {
  constructor(props) {
  super(props);
  this.state={
    drone_id:"",
    service_id:"",
    user_email:"",
    name:"",
    description:"",
    speed:"",
    altitude:"",
    lat:"",
    long:"",
    distance:"",
    battery:"",
    cpu_usage:"",
    payload_weight:"",
    payload_type:""
   
  };
}

componentDidMount(){
}


  render() {
    console.log("the tracking detials are"+this.props.drone);
    let drone=this.props.drone;
    return(
      <Card style={{ width: '25rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      <Card.Body>
      <Card.Title>Drone Name : {drone.drone_name}</Card.Title>
        <Card.Text>
        <h5> Description:  {drone.description}</h5>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
       <ListGroupItem>  <h5> Speed: {drone.speed} m/s  </h5></ListGroupItem>
        <ListGroupItem><h5> Altitude: {drone.altitude} m</h5></ListGroupItem>
        <ListGroupItem><h5>Distance: {drone.distance} miles</h5></ListGroupItem>
        <ListGroupItem><h5>Battery: {drone.battery} %</h5></ListGroupItem>
        <ListGroupItem><h5>CPU Usage: {drone.cpu_usage} %</h5></ListGroupItem>
        <ListGroupItem><h5>Payload Type: {drone.payload_type}</h5></ListGroupItem>
        <ListGroupItem><h5>Payload Weight: {drone.payload_weight} pounds.</h5></ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Live Location</Card.Link>
      </Card.Body>
    </Card>
    )}
    }



  
export default TrackingCard;