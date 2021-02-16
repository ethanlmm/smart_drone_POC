import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createAgricultureService } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

class CreateAgricultureService extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          basecost: "",
          drone_id: "",
          errors: "",
          servicetype:"",
          text: null,
          formErrors: {},
          serviceTypeList:[],
          drone_id:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      const dronedetails = this.props.location.state;
      console.log("dronedetails: " , dronedetails);
      var drone_id = dronedetails.drone_id;
      var dronetype = dronedetails.type;
      console.log("dronedetails : " , {drone_id,dronetype});

    /*}  [dronedetails].map(dronedetails => 
        //imageuri ="data:image/png[jpg][jpeg];base64," + dronedetails.image,
        
        dronetype = dronedetails.type,
        drone_id = dronedetails.drone_id
    )*/

      var serviceTypeList;

      if(dronetype === "datacollection") {
        serviceTypeList = [
          { value: 'cropmapping', name: 'Crop Mapping and Surveying' },     
          { value: 'analysis', name: 'Soil and field analysis' },           
        ]; 
      } else if(dronetype === "spraying") {
        serviceTypeList = [
          { value: 'cropspraying', name: 'Crop Spraying and Spot Spraying' },           
        ];
      } else if(dronetype === "spreading") {
        serviceTypeList = [
          { value: 'seedplanting', name: 'Seed Planting' },           
        ];
      } else if(dronetype === "monitoring") {
        serviceTypeList = [
          { value: 'irrigationmonitoring', name: 'Irrigation Monitoring and Management' },     
          { value: 'liverstock', name: 'Real time livestock monitoring' },           
        ]; 
      }

      this.setState({
        serviceTypeList,
        servicetype:serviceTypeList[0].value,
        drone_id
      })
    }

    componentDidUpdate(prevProps) {
     
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

    serviceTypeChange = (e) => {
      this.setState({
        servicetype: e.target.value,
      });
    };

    validate = () => {
  
      let nameError = "";
      let costError = "";
      let descriptionError = "";

      var costExp = /^[1-9]\d{0,7}(?:\.\d{1,4})?$/;
  
      if (!this.state.name) {
        nameError = "Please enter service Name";
      }
  
      if (!this.state.basecost) {
        costError = "Please enter cost";
      } else if (!this.state.basecost.match(costExp)) {
        costError =
          "Enter a valid cost (Allowed are prices in numbers. Min - 0) ";
      }
  
  
      if (!this.state.description) {
        descriptionError = "Please enter description";
      }
  
  
      if (
        nameError || costError ||
        descriptionError 
      ) {
        this.setState((prevState) => ({
          formErrors: {
            // object that we want to update
            ...prevState.formErrors, // keep all other key-value pairs
            nameError: nameError, // update the value of specific key
            costError: costError,
            descriptionError: descriptionError
          },
        }));
        return false;
      }
      return true;
    };

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


      handleSubmit = (e,drone_id)  => {
        //prevent page from refresh
        e.preventDefault();
        this.setState({
          text: "",
          errors: "",
        });
        const isValid = this.validate();
        if (isValid) {
          const data = {
            name: this.state.name,
            basecost: this.state.basecost,
            description: this.state.description,
            drone_id:drone_id,
            servicetype:this.state.servicetype,
            servicestatus:'active'
          };

          //console.log("data to send:" + data.image);
    
          this.props.createAgricultureService(data);

          setTimeout(() => {   this.props.history.push("/main/adminservicecatalog",this.props.location.state); }, 1000);
        }
        
      };

      render() {
        const { text, errors } = this.state;

        

    
        return (    
                <div style={{ height: "75vh" }}>
                <div className="row">
                <div className="col s12 center-align background blue">
                <h2 className="text-center text-white font-italic font-family-sans-serif">
                  Create Agriculture Service
                </h2>
                </div>   
              </div>

              <div className="container border ">
              <div class="row justify-content-center">
                  <div class="col-md-12"> 
                  <br/>
                  <h5> 
                <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                    required
                  />
                  {this.state.formErrors.nameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.nameError}
                </div>
              ) : null}
                  </Form.Group>

                <Form.Group controlId="basecost">
                  <Form.Label>Base Cost</Form.Label>
                  <Form.Control
                  type="text"
                    name="basecost"
                    value={this.state.basecost}
                    onChange={this.handleChange}
                    placeholder="Base Cost"
                    required
                  />
                  {this.state.formErrors.costError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.costError}
                </div>
              ) : null}
                  </Form.Group>

                  <Form.Group controlId="servicetype">
            <Form.Label>Service Type: </Form.Label>
            <Form.Control as="select" name="servicetype" custom onChange={this.serviceTypeChange} value={this.state.servicetype}>
            {this.state.serviceTypeList.map((e, key) => {
        return <option key={key} value={e.value}>{e.name}</option>;
    })} 
            </Form.Control> 
                  </Form.Group>


                 
               
                 <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Description"
                  />
                  {this.state.formErrors.descriptionError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.descriptionError}
                </div>
              ) : null}
                  </Form.Group>
              
              <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleSubmit(e,this.state.drone_id)}>
                Create Agriculture Service
              </Button>
              <br />
              <p className="text-danger"> {errors}</p>
              <p className="text-success"> {text}</p>
              <br />
            </Form>
            </h5>
            </div>
            </div>
            </div>
            </div>
        );
      }


} 

  const mapStateToProps = (state) => ({
    store: state.storeState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps, { createAgricultureService })(CreateAgricultureService);
