import React, { Component } from "react";
import {getAgricultureServicesByDroneId} from "../_actions/droneActions";
import {removeService} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

import { Card, Button,Col,Row,Modal } from "react-bootstrap";
import UpdateAgricultureService from "./UpdateAgricultureService";

 
class AdminAgricultureServiceCatalog extends Component {
  state={
    drone_id:"",
    service_id:"",
    basecost:"",
    description:"",
    name:"",
    servicetype:"",
    dronetype:"",
    updateModalShow:false,
    drone_id:""
  }

  
  onHide = () => this.setState({ updateModalShow: false });
  
  componentDidMount(){


    const dronedetails = this.props.location.state;
    //var drone_id;

    [dronedetails].map(dronedetails => 

      this.state.drone_id = dronedetails.drone_id,
      this.state.dronetype = dronedetails.type
      )

    const params = {
        id : this.state.drone_id
      };
    this.props.getAgricultureServicesByDroneId(params);
  }

  updateService = (e,agricultureservice) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/updateservice",agricultureservice);
    
  };

  deleteService = (e,service_id) => {
    //prevent page from refresh
    //e.preventDefault();

    const params = {
        id : service_id
      };
    this.props.removeService(params);
    window.location.reload();
  };


  render() {
const {agricultureservices,loading} = this.props.droneState;
  let serviceContent;
  var servicetypename;

  if(agricultureservices==null || loading){
    <Spinner />
  }
  else{
  serviceContent = agricultureservices.map((agricultureservice,index)=>{
    agricultureservice.dronetype = this.state.dronetype;

    if(agricultureservice.servicetype === "cropmapping") {
      servicetypename = 'Crop Mapping and Surveying';
     
    } else if(agricultureservice.servicetype === "analysis") {
      servicetypename = 'Soil and Field Analysis';
     
    } else if(agricultureservice.servicetype === "cropspraying") {
      servicetypename = 'Crop Spraying and Spot Spraying';
     
    } else if(agricultureservice.servicetype === "seedplanting") {
      servicetypename = 'Seed Planting' ;          
      
    } else if(agricultureservice.servicetype === "irrigationmonitoring") {
     servicetypename = 'Irrigation Monitoring and Management'; 
    
    } else if (agricultureservice.servicetype === "liverstock") {
        servicetypename = 'Real time livestock monitoring';
    }

    return(
       /*<tr>
           <td><h4>{agricultureservice.name}</h4></td>
           <td><h4>{agricultureservice.basecost}</h4></td>
           <td><h4>{agricultureservice.description}</h4></td>
           <td><h4>{agricultureservice.servicetype}</h4></td>
           <td><Button
                className="btn btn-primary" type="submit"
                onClick={e => this.updateService(e,agricultureservice)}>
                Update Service
              </Button></td>
              <td><Button
                className="btn btn-primary" type="submit"
                onClick={e => this.deleteService(e,agricultureservice.service_id)}>
                Delete Service
              </Button></td>
       </tr>*/
        <Col>
       <Card bg="white" style={{ width: "30rem" , margin: "1rem"}}>
      {/*} <Card.Img variant="top"/>*/}
          {/* <Card.Body><Card.Img variant="top" src={this.props.product.imageURL} /> */}
           <Col>
             <Card.Title> Service Name: {agricultureservice.name} </Card.Title>
             <h5><Card.Text>
               Description: {agricultureservice.description}
             </Card.Text>
             <Card.Text>
               Basecost: ${agricultureservice.basecost}  
             </Card.Text>

             <Card.Text>
               Service Type: {servicetypename}  
             </Card.Text></h5> 
           </Col>
           <br/>

           <Button
                style={{margin: "30px"}}
                className="btn btn-primary buttonTop" type="submit"
                onClick={() => this.setState({ updateModalShow: true })}>
               <h6> Update Service</h6>
              </Button>


              <Modal
              show={this.state.updateModalShow}
              autoFocus="true"
              fade={false}
              onHide={this.onHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Update Service
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UpdateAgricultureService agricultureservice={agricultureservice} drone_id={this.state.drone_id}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>

           {/*<Button
                className="btn btn-primary" type="submit"
                onClick={e => this.updateService(e,agricultureservice)}>
                Update Service
           </Button>*/}
           
              <Button
                className="btn btn-danger" type="submit"
                onClick={e => this.deleteService(e,agricultureservice.service_id)}>
               <h6> Delete Service</h6>
              </Button>
             
           </Card></Col>
    )
    
  })}

    
    return (
      <div style={{ height: "75vh" }} >
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Service Catalog
            </h2>
          </div>
        </div>
        <div className=" container">
            <div>
            {/*<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Basecost</th>
      <th scope="col">Description</th>
      <th scope="col">Service Type</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
              {serviceContent}
              </tbody>
    </table>*/}
   <Row> {serviceContent}</Row> 
          </div>
          </div>
      </div>
    );
  }
}


AdminAgricultureServiceCatalog.propTypes={
  errors: PropTypes.object.isRequired,
  agricultureServices:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getAgricultureServicesByDroneId,removeService}) (AdminAgricultureServiceCatalog);