import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card,Button,Col,Row,Form, Accordion,Badge} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookDroneService } from "../_actions/serviceActions";
import {getUserDetails} from "../_actions/accountActions";


class ServiceBookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        drone_id:"",
        service_id:"",
        user_email:"",
        name:"",
        description:"",
        basecost:"",
        startDate:"",
        endDate:"",
        sessionTime:"15",
        sessionNumber:"1",
        added:false,
        user:{},
        address1:"",
        address2:"",
        city:"",
        stateName:"",
        zip:"",
      errors: "",
      text: null,
      formErrors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let { drone_id,user_email,service_id,name,description,basecost } = this.props.service;
    let email=localStorage.getItem("email");
    this.setState({
      drone_id: drone_id,
      user_email: email,
      service_id: service_id,
      name: name,
      description: description,
      basecost: basecost,
    });
  }

  componentDidMount(){
    let email=localStorage.getItem("email");
      let data={
         email:email
      }
      let date = new Date();
      this.setState({
          startDate:date,
          endDate: date

      })
      this.props.getUserDetails(data);
  }

  startDateChange = value=> {
    this.setState({
      startDate: value,
    });
  };

  startDateSelect = value => {
    console.log("the event is"+value);
    this.setState({
      startDate: value ,
    });
  };

  endDateChange = value=> {
    this.setState({
      endDate: value,
    });
  };

  endDateSelect = value => {
    console.log("the event is"+value);
    this.setState({
      endDate: value ,
    });
  };


  sessionTimeChange = async (e) => {
    this.setState({
      sessionTime: e.target.value,
    });
  };

  sessionNumberChange = async (e) => {
    this.setState({
      sessionNumber: e.target.value,
    });
  };

  address1Change = async (e) => {
    this.setState({
      address1: e.target.value,
    });
  };

  address2Change = async (e) => {
    this.setState({
      address2: e.target.value,
    });
  };

  cityChange = async (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  stateNameChange = async (e) => {
    this.setState({
      stateName : e.target.value,
    });
  };

  zipChange = async (e) => {
    this.setState({
      zip: e.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.accountState &&
      this.props.accountState !== prevProps.accountState
    ) {
      if (Object.keys(this.props.accountState.user).length !== 0) {
          let user = this.props.accountState.user
        this.setState({
         address1:user.address1,
         address2:user.address2,
         city:user.city,
         stateName:user.stateName,
         zip:user.zip
        });
      }
    }
    if (this.props.errors !== prevProps.errors) {
      console.log("errors are" + this.props.errors);
      if (this.props.errors) {
        this.setState({
          text: "",
          formErrors: {},
          errors: this.props.errors.message,
        });
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    var letters = /^[0-9a-zA-Z]+$/;

    var zipExp = /^\d{5}(-\d{4})?$/;

    let address1Error = "";
    let address2Error = "";
    let cityError = "";
    let stateNameError = "";
    let zipError = "";

    if (!this.state.address1) {
        address1Error = "Please enter Address";
    }

    if (!this.state.address2) {
        address2Error = "Please enter Address 2";
    }

    if (!this.state.city) {
        cityError = "Please enter City";
    }

    if (!this.state.stateName) {
      stateNameError = "Please enter State";
    }

    if (!this.state.zip) {
      zipError = "Please enter Zipcode";
    } else if (!this.state.zip.match(zipExp)) {
      zipError =
        "The US zip code must contain 5 digits. Allowed formats are 12345 or 12345-1234";
    }

    if (
      address1Error ||
      address2Error ||
      cityError ||
      stateNameError ||
      zipError
    ) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs // update the value of specific key
          address1Error: address1Error,
          address2Error: address2Error,
          cityError: cityError,
          stateNameError: stateNameError,
          zipError: zipError,
        },
      }));
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

    const isValid = this.validate();
    if (isValid) {
    const data = {
            drone_id: this.state.drone_id,
            user_email: this.state.user_email,
            service_id: this.state.service_id,
            service_basecost:this.state.basecost,
            service_startdate:this.state.startDate,
            service_enddate:this.state.endDate,
            session_time:this.state.sessionTime,
            no_of_sessions:this.state.sessionNumber,
            address1:this.state.address1,
            address2:this.state.address2,
            city:this.state.city,
            stateName:this.state.stateName,
            zip:this.state.zip,
            service_totalcost: eval("this.state.basecost * this.state.sessionTime * this.state.sessionNumber"),
          };   
          this.props.bookDroneService(data);
    }
  };

  render() {
    const { text, errors } = this.state;
    const {name,description,basecost } = this.props.service;
    const{user}=this.props.accountState;
    const{startDate,endDate,sessionTime,sessionNumber} =this.state;

    return (
      <div>
        <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="displayName">
            <Form.Label><h5>Client Name : {user.displayName}</h5></Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="serviceName">
            <Form.Label><h5>Service Name : {name}</h5></Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="serviceDescription">
            <Form.Label><h5>Service Description : {description}</h5></Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="serviceBasecost">
            <Form.Label><h5>Service Basecost : {basecost}</h5></Form.Label>           
            </Form.Group>
          </Form.Row>

          <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} variant="link"  eventKey="0">
               <h5 className="text-bold text-info"> Booking Location Details</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
           
            <Form.Group controlId="formGridAddress1">
                <h5>
                <Form.Label>Address</Form.Label>
                <Form.Control
                 type="text"
                 name="address1"
                 defaultValue={user.address1}
                 placeholder="1234 Main St" 
                 onChange={this.address1Change}
                 />             
                {this.state.formErrors.address1Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address1Error}
                      </div>
                    ) : null}
                    </h5> <br/>
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
                <h5>
                <Form.Label>Address 2</Form.Label>
                <Form.Control 
                type="text"
                name="address2"
                defaultValue={user.address2}
                placeholder="Apartment, studio, or floor"
                onChange={this.address2Change}
                 />               
                {this.state.formErrors.address2Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address2Error}
                      </div>
                    ) : null}
                    </h5>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <h4>
                <Form.Label>City</Form.Label>
                <Form.Control 
                type="text"
                name="city"
                defaultValue={user.city}
                onChange={this.cityChange}
                />               
                {this.state.formErrors.cityError ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.cityError}
                      </div>
                    ) : null}
                    </h4>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <h4>
                <Form.Label>State</Form.Label>
                <Form.Control 
                as="select" 
                name="stateName"
                defaultValue={user.stateName}
                onChange={this.stateNameChange}
                >
                    <option>CA</option>
                    <option>TX</option>
                    <option>VA</option>
                </Form.Control>              
                {this.state.formErrors.stateNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.stateNameError}
                        </div>
                      ) : null}
                </h4>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <h4>
                <Form.Label>Zip</Form.Label>
                <Form.Control 
                type="text"
                name="zip"
                defaultValue={user.zip}
                onChange={this.zipChange}
                />              
                {this.state.formErrors.zipError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.zipError}
                        </div>
                      ) : null}
                  </h4>
                </Form.Group>
            </Form.Row>
            </Card.Body>
            </Accordion.Collapse>
            </Card>
        </Accordion>
            
        <Form.Row>
        <Form.Group as={Col} controlId="selectDate">
        <h5>
        <Form.Label>Start Date: </Form.Label>
        <DatePicker
            selected={startDate}
            onChange={event =>
              this.startDateChange(
                event
              )
            }
            onSelect={event =>
              this.startDateSelect(
                event
              )
            }
          />
          </h5>
          </Form.Group>
        <Form.Group as={Col} controlId="selectDate">
        <h5>
        <Form.Label>End Date: </Form.Label>
        <DatePicker
            selected={endDate}
            onChange={event =>
              this.endDateChange(
                event
              )
            }
            onSelect={event =>
              this.endDateSelect(
                event
              )
            }
          />
          </h5>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="sessionTime">
            <h5>
            <Form.Label>Time per Session</Form.Label>
            <Form.Control 
            as="select" 
            name="sessionTime"
            defaultValue={this.state.sessionTime}
            onChange={this.sessionTimeChange}
            >
              <option selected value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
                </Form.Control>              
                {this.state.formErrors.sessionTimeError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                {this.state.formErrors.sessionTimeError}
                </div>
                ) : null}
                </h5>
            </Form.Group>

            <Form.Group as={Col} controlId="sessionNumber">
            <h5>
            <Form.Label>Number of Sessions</Form.Label>
            <Form.Control 
            type="number"
            min="1"
            name="sessionNumber"
            defaultValue={this.state.sessionNumber}
            onChange={this.sessionNumberChange}
            >
               </Form.Control>              
                {this.state.formErrors.sessionNumberError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                {this.state.formErrors.sessionNumberError}
                </div>
                ) : null}
                </h5>
            </Form.Group>
           </Form.Row>

          <Button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            type="submit"
          >
           <h6> Confirm Booking</h6>
          </Button>
          <br />
          <p className="text-danger"> {errors}</p>
          <p className="text-success"> {text}</p>
          <br />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    droneState:state.droneState,
    accountState:state.accountState,
    serviceState:state.serviceState,
    errorState:state.errorState
});
export default connect(mapStateToProps, { bookDroneService,getUserDetails })(ServiceBookingForm);
