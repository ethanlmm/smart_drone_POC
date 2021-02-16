import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { getServiceRequests,approveRequest,rejectRequest } from "../_actions/serviceActions";
const backendurl = properties.backendhost;

class ReviewServiceRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id:"",
      user_name:"",
      user_email:"",
      drone_name: "",
      drone_id: "",
      service_name: "",
      service_id:"",
      service_date:"",
      session_time:"",
      no_of_sessions:"",
      service_basecost:"",
      service_totalcost:"",
      pilot_assigned:"No Pilot",
      droneServiceRequests: [],
      approvalResponse: "",
      rejectionResponse: "",
      rowIndex: "",
    };
  }

  componentDidMount() {
    this.props.getServiceRequests();
  }

  assignPilot = (e,index) => {
    this.setState({
      rowIndex: index,
      pilot_assigned: e.target.value,
    });
  };


  onApprove(index, serviceRequestId) {
    this.setState({
      rowIndex: index,
    });

    let data = {
      pilot_assigned: this.state.pilot_assigned,
      serviceRequestId: serviceRequestId
    };
  
    this.props.approveRequest(data);
   
  }

  onReject(index, serviceRequestId) {
    this.setState({
      rowIndex: index,
    });
    let data = {
      serviceRequestId: serviceRequestId
    };
    this.props.rejectRequest(data);
  }


  transformDateTime(data) {
    let date = new Date(data)
    return date.toUTCString()  
}

  render() {
    const { rowIndex, approvalResponse, rejectionResponse } = this.state;
    const { droneServiceRequests, loading } = this.props.serviceState;
    let spinner;
    if (droneServiceRequests === null || loading) {
      spinner = <Spinner />;
    }
    return (
      <div style={{ height: "75vh"}}>
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Service Requests
            </h2>
          </div>
        </div>
        <div>
          <table className="table table-bordered table-hover">
            {spinner}
            <thead className="thead table-bordered">
              <tr>
                <td className="text-center  font-weight-bold"  scope="col">
                  <h5>User Name</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Drone Name</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Drone Status</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Serivce Name</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Service Start Date</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Service End Date</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Requested Session Time</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                 <h5>Requested Number of Sessions</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                  <h5>Service Total Cost</h5>
                </td>
                <td className="text-center  font-weight-bold" scope="col">
                  <h5>Assign Pilot</h5>
                </td>
                <td scope="col"></td>
              </tr>
            </thead>
            <tbody>
              {droneServiceRequests
               .filter(
                (droneServiceRequest) =>
                droneServiceRequest.request_status !== "Approved" && droneServiceRequest.request_status !== "Rejected"
                )
                .map((droneServiceRequest, index) => {
                  //console.log("the service request rec is " + droneServiceRequest);   
                  return (
                    <tr key={index}>
                      <th className="text-center text-primary" scope="row">
                        <h5>{droneServiceRequest.userName}</h5>
                      </th>
                      {/* <td className="text-center">{droneServiceRequest.request_id}</td> */}
                      <td className="text-center text-primary"><h5>{droneServiceRequest.droneName}</h5></td>
                      <td className="text-center text-primary"><h5>{droneServiceRequest.droneStatus}</h5></td>
                      <td className="text-center text-primary"><h5>{droneServiceRequest.serviceName}</h5></td>
                      <td className="text-center text-primary"><h5>{this.transformDateTime(droneServiceRequest.service_startdate)}</h5></td>
                      <td className="text-center text-primary"><h5>{this.transformDateTime(droneServiceRequest.service_enddate)}</h5></td>
                      <td className="text-center text-primary"><h5>{droneServiceRequest.serviceTime}</h5></td>
                      <td className="text-center text-primary"><h5>{droneServiceRequest.serviceSessionNumber}</h5></td>
                      <td className="text-center text-primary"><h5>{droneServiceRequest.serviceTotalCost}</h5></td>
                      <td className="text-center text-primary"><h5>
                      <select type="text"
                      onChange={(e) =>
                        this.assignPilot(e, index)
                      }
                      > 
                       <option selected value="No Pilot">No Pilot</option>
                        <option value="Bill Smith">Bill Smith</option>
                        <option value="Liam Cassidy">Liam Cassidy</option>
                        <option value="Javier Green">Javier Green</option>
                        <option value="Joe Garner">Joe Garner</option>
                      </select></h5>
                      </td>
                      <td className="text-center">
                        <tr className="text-center">
                          <td>
                            <Button
                              variant="success"
                              size="lg"
                              onClick={() =>
                                this.onApprove(index, droneServiceRequest.request_id)
                              }
                              type="submit"
                            >
                              <b>Approve</b>
                            </Button>

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {approvalResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </td>

                          
                            {/* <Button
                               variant="danger"
                               size="lg"
                              onClick={() => {
                                this.onReject(index, droneServiceRequest.request_id);
                              }}
                              type="submit"
                            >
                              <b>Reject</b> 
                            </Button> */}

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {rejectionResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          
                        </tr>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReviewServiceRequests.propTypes = {
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  serviceState: state.serviceState,
  errors: state.errorState,
});
export default connect(mapStateToProps,{getServiceRequests,approveRequest,rejectRequest})(ReviewServiceRequests);
