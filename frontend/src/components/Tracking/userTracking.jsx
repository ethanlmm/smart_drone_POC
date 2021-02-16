import React, { Component} from "react";
import {getTrackingDetailsByUser} from "../_actions/trackingActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import  TrackingCard  from "../Tracking/TrackingCard";
import { Col , Row} from "react-bootstrap";

class userTracking extends Component {
  constructor(props) {
  super(props);
  this.state={
    drone_id:"",
    name:"",
   
  };
}

  componentDidMount(){
    const user_email=localStorage.getItem("email");
    this.setState({
      user_email:user_email,
     
    })
    const data = {
        user_email : user_email
      };
    this.props.getTrackingDetailsByUser(data);
  }



  render() {
    const {drones,loading} = this.props.trackingState;
    console.log("drones : "+JSON.stringify(drones));
    let trackingContent;
    if((Array.isArray(drones) && drones.length===0) || loading){
      <Spinner />
    }
    else{
    trackingContent = drones.map((drone,droneIndex)=>{
        console.log("drone details are : "+drone);
        return (
          <Col key={droneIndex} sm={5}>
            <TrackingCard drone={drone}  />
          </Col>
        );
      });
    }
    
    return (
      <div style={{ height: "75vh" }}>
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Drone Tracking
            </h2>
          </div>
        </div>
        <div className=" container">  
        <div className="container">
         <Row>{trackingContent}</Row> 
          </div>
          </div>
      </div>
    );
  }
}

userTracking.propTypes={
    errors: PropTypes.object,
    drones:PropTypes.array,
  }
  const mapStateToProps =(state)=>({
    trackingState:state.trackingState,
    errorState:state.errorState
  })
  
  
  
  export default connect(mapStateToProps,{getTrackingDetailsByUser}) (userTracking);