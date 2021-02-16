import React, {Component} from "react";
import {Form,Row,Col,Button,Container} from "react-bootstrap";
import PropTypes from "prop-types";
import { updateAccount,getUserDetails } from "../_actions/accountActions";
import Modal from "react-responsive-modal";
import Spinner from "../../common/Spinner";
import { connect } from "react-redux"; 

class Account extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            address1:"",
            address2:"",
            city:"",
            stateName:"CA",
            zip:"",
            loading: false,
            formErrors: {},

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      let email=localStorage.getItem("email");
      let data={
         email:email
      }
      this.props.getUserDetails(data)
    }

    componentDidUpdate(prevProps) {
        console.log("repsonse status is "+ this.props.accountState);
        if (
          this.props.accountState &&
          this.props.accountState !== prevProps.accountState
        ) {
          if(Object.keys(this.props.accountState.user).length>0){
            const user=this.props.accountState.user;
            this.setState({
              address1:user.address1,
              address2:user.address2,
              city:user.city,
              stateName:user.stateName,
              zip:user.zip,
            })
          }
          if (this.props.accountState.responseStatus === 200) {
            this.setState({
              text: "Account Updated",
              formErrors: {},
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

    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value,
        });
    }

    validate = () => {
        var letters = /^[0-9a-zA-Z]+$/;   
        var zipExp = /^\d{5}(-\d{4})?$/;
        let address1Error = "";
        let address2Error = ""
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
              ...prevState.formErrors, // keep all other key-value pairs
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

    handleSubmit(e){
        e.preventDefault();
        this.setState({
          errors: "",
        });

        const isValid = this.validate();

        if (isValid) {
            this.setState({
              loading: true,
            });      

        const data = {
           email: localStorage.getItem("email"),
           address1: this.state.address1,
           address2: this.state.address2,
           city: this.state.city,
           stateName: this.state.stateName,
           zip: this.state.zip,
        }
        console.log("data from this account form is ..", data);
        this.props.updateAccount(data);
    }
    }


    render(){
      const{user}=this.props.accountState;
        let spinner;
        if (this.props.accountState.loading) {
          spinner = <Spinner animation="border" variant="primary" />;
        }
        return(
        <div style={{ height: "55vh" }} >       
          <div className="row">
            <div className="col s12 center-align background blue">
               <h2 className="text-center text-white font-italic font-family-sans-serif">
                Account
               </h2>
            </div>
            </div>
            <div style={{ height: "55vh" }} className="container valign-wrapper">  
            <Container fluid className="border border-primary">
            <Form>
            <Form.Group controlId="formGridAddress1">
                <h4>
                <Form.Label>Address</Form.Label>
                <Form.Control
                 type="text"
                 name="address1"
                 defaultValue={user.address1}
                 placeholder="1234 Main St" 
                 onChange={this.handleChange}
                 />             
                {this.state.formErrors.address1Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address1Error}
                      </div>
                    ) : null}
                    </h4>
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <h4>
                <Form.Label>Address 2</Form.Label>
                <Form.Control 
                type="text"
                name="address2"
                defaultValue={user.address2}
                placeholder="Apartment, studio, or floor"
                onChange={this.handleChange}
                 />               
                {this.state.formErrors.address2Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address2Error}
                      </div>
                    ) : null}
                    </h4>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <h4>
                <Form.Label>City</Form.Label>
                <Form.Control 
                type="text"
                name="city"
                defaultValue={user.city}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                />              
                {this.state.formErrors.zipError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.zipError}
                        </div>
                      ) : null}
                  </h4>
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
               <h5> UPDATE </h5>
            </Button>
            {spinner}
            </Form>  
            </Container> 
        </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    accountState: state.accountState,
    errors: state.errorState,
  });

export default connect(mapStateToProps,{updateAccount,getUserDetails})(Account);