import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {getDrones} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import DroneCard from "./DroneCard";
 
class CustomerHome extends Component {
  state={
    drone_id:"",
    name:"",
    type:"",
    size:"",
    description:"",
    image:""
  }

  componentDidMount(){
    this.props.getDrones();
    
  }


  render() {
  const {drones,loading} = this.props.droneState;
  let droneContent;
  if(drones==null || loading){
    <Spinner />
  }
  else{
  droneContent = drones.map((drone,index)=>{
    return(
        <Col key={index} md={6}>
        <DroneCard drone={drone} />
      </Col>)
    
  })}

    
    return (
       <div style={{ height: "75vh" }} >       
        <div className="row">
          <div className="col s12 center-align background blue">
          <h2 className="text-center text-white font-italic font-family-sans-serif">
             Drone Catalog
          </h2>
          </div>   
        </div>
      
        <div className=" container">
          <div className="container">
            <div>
              <Row width="90%">{droneContent}</Row>
            </div>
          </div>
          </div>
          </div>
      
    );
  }
}


CustomerHome.propTypes={
  errors: PropTypes.object.isRequired,
  drones:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getDrones}) (CustomerHome);