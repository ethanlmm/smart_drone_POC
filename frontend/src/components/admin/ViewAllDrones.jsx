import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import {getDrones} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import DroneCard from "../Home/DroneCard";
 
class ViewAllDrones extends Component {
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
        <Col key={index} sm={6}>
        <DroneCard drone={drone} />
      </Col>)
    
  })}

    
    return (
       <div style={{ height: "75vh" }}>
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Drone Catalog
            </h2>
          </div>
        </div>
          <div className="container">
            <div>
              <Row>{droneContent}</Row>
            </div>
          </div>
          </div>
  
    );
  }
}


ViewAllDrones.propTypes={
  drones:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getDrones}) (ViewAllDrones);