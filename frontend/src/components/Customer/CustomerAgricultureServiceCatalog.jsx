import React, { Component} from "react";
import {getAgricultureServicesByDroneId} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import  ServiceCard  from "../Customer/ServiceCard";
import { Card, Button, Col , Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

class CustomerAgricultureServiceCatalog extends Component {
  constructor(props) {
  super(props);
  this.state={
    drone_id:"",
    service_id:"",
    basecost:"",
    description:"",
    name:""
  };
}

  componentDidMount(){
    const drone_id = this.props.location.state;
    const user_email=localStorage.getItem("email");
    this.setState({
      drone_id: drone_id,
      user_email:user_email,
     
    })
    const params = {
        id : drone_id
      };
    this.props.getAgricultureServicesByDroneId(params);
  }

  // updateService = (e,service_id) => {
  //   //prevent page from refresh
  //   //e.preventDefault();

  //  this.props.history.push("/main/updateservice",service_id);
    
  // };


  render() {
  const {agricultureservices,loading} = this.props.droneState;
  let serviceContent;
  if(agricultureservices==null || loading){
    <Spinner />
  }
  else{
  serviceContent = agricultureservices.map((service,serviceIndex)=>{
      return (
        <Col key={serviceIndex} sm={6}>
          <ServiceCard service={service} drone_id={this.state.drone_id} user_email={this.state.user_email}  />
        </Col>
      );
    });
  }
    return (
      <div style={{ height: "15vh" }}>
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Service Catalog
            </h2>
          </div>
        </div>
  
        <div className="container">
         <Row> {serviceContent}</Row> 
          </div>
      </div>
    );
  }
}


CustomerAgricultureServiceCatalog.propTypes={
  errors: PropTypes.object,
  agricultureServices:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})



export default connect(mapStateToProps,{getAgricultureServicesByDroneId}) (CustomerAgricultureServiceCatalog);