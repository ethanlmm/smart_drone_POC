import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getDroneDetails } from "../_actions/droneActions";
import PropTypes from "prop-types";
import dronespraying from "../../common/images/dronespraying.jpg";
import Spinner from "../../common/Spinner";

class DroneCard extends Component {
  constructor(props) {
    super(props);
    
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state={
    drone:{}
  }
  
  handleSubmit = (drone_id) => {
    //prevent page from refresh
   // e.preventDefault();
   
    const params = {
      id : drone_id
    };

     this.props.getDroneDetails(params);

     if (
      localStorage.getItem("usertype") === "admin"
    ) {
      this.props.history.push("/main/admindronedetails",this.props.drone);
    } else if (
      localStorage.getItem("usertype") === "customer"
    ) {
      this.props.history.push("/main/customerdronedetails",this.props.drone);
    }

     
 
  };

  render() {
    const { drone } = this.props;
    var imageuri = drone.image;
    if(imageuri != null || imageuri != undefined)
    imageuri = imageuri.replace(/"/g, '');
   
    return (
    <Card bg="white" style={{ width: "100%", margin: "1%", height: "500px"}}>
    <Card.Img variant="top" src={imageuri} style={{height: "250px"}}/>
    <Card.Body>
    <Card.Title>{drone.name}</Card.Title>
    <Card.Text style={{height: "80px"}}>
       <h5> {drone.description}</h5>
    </Card.Text>
    <Button variant="primary" type="submit" 
                onClick={() => this.handleSubmit(drone.drone_id)}><b>Details</b></Button>
    </Card.Body>
    </Card>
    );
  }
}

DroneCard.propTypes={
  drones:PropTypes.array,
  drone:PropTypes.any
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
  droneState:state.droneState
});


export default withRouter(connect(mapStateToProps, { getDroneDetails }) (DroneCard));
