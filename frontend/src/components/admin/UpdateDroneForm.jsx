import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { updateDrone } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

import { withRouter } from "react-router";

class UpdateDroneForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          size: "",
          type: "",
          description: "",
          softwarespecs: "",
          hardwarespecs: "",
          base64TextString:"",
          image:null,
          wingspan:"",
          weight:"",
          battery:"",
          camera:"",
          flighttime:"",
          flightrange:"",
          flightaltitude:"",
          flightspeed:"",
          flightplanningsoftware:"",
          imagesoftware:"",
          powerconsumption:"",
          fileName:"",
      errors: "",
      text: null,
      formErrors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount(){
        const dronedet = this.props.drone;
        console.log("drone details image :" + dronedet.image);
        [dronedet].map(dronedet => 
            this.setState({
                name:dronedet.name,
                description:dronedet.description,
                size:dronedet.size,
                type:dronedet.type,
                imageUrl:dronedet.image,
                hardwarespecs:dronedet.hardwarespecs,
                softwarespecs:dronedet.softwarespecs,
                wingspan:dronedet.wingspan,
                weight:dronedet.weight,
                battery:dronedet.battery,
                camera:dronedet.camera,
                flighttime:dronedet.flighttime,
                flightrange:dronedet.flightrange,
                flightaltitude:dronedet.flightaltitude,
                flightspeed:dronedet.flightspeed,
                flightplanningsoftware:dronedet.flightplanningsoftware,
                imagesoftware:dronedet.imagesoftware,
                powerconsumption:dronedet.powerconsumption,
              })
        )
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

    validate = () => {
  
      let nameError = "";
      let sizeError = "";
      let descriptionError = "";
  
      if (!this.state.name) {
        nameError = "Please enter drone Name";
      }
  
      if (!this.state.size) {
        sizeError = "Please enter size";
      }
  
      /*if (!this.state.type) {
        typeError = "Please enter type";
      }*/
  
      if (!this.state.description) {
        descriptionError = "Please enter description";
      }
  
  
      if (
        nameError ||
        sizeError ||
        descriptionError 
      ) {
        this.setState((prevState) => ({
          formErrors: {
            // object that we want to update
            ...prevState.formErrors, // keep all other key-value pairs
            nameError: nameError, // update the value of specific key
            sizeError: sizeError,
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

      handleImageChange = (e) => {
        console.log("files to upload: " , e.currentTarget.files[0]);

        this.setState({
            fileName: e.target.files[0].name
          })
        
        //const file =  e.currentTarget.files[0];
        this.setState({ image: e.currentTarget.files[0] }, () => { console.log("files: " + this.state.image) });

        
        //console.log(files[0]);
        

         // console.log("image to upload: " + JSON.stringify(this.state.file));
        /*if(file) {
          const reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }*/
      }

      _handleReaderLoaded = (readerEvt) => {
        const binaryString = readerEvt.target.result
        this.setState({
          base64TextString : btoa(binaryString)
        })
      }



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
            name: this.state.name,
            size: this.state.size,
            type: this.state.type,
            description: this.state.description,
            //image:this.state.base64TextString,
            image:this.state.image,
            imageUrl:this.state.imageUrl,
            softwarespecs: this.state.softwarespecs,
              hardwarespecs: this.state.hardwarespecs,
              wingspan:this.state.wingspan,
              weight:this.state.weight,
              battery:this.state.battery,
              camera:this.state.camera,
              flighttime:this.state.flighttime,
              flightrange:this.state.flightrange,
              flightaltitude:this.state.flightaltitude,
              flightspeed:this.state.flightspeed,
              flightplanningsoftware:this.state.flightplanningsoftware,
              imagesoftware:this.state.imagesoftware,
              powerconsumption:this.state.powerconsumption,
            id:this.props.drone_id
          };

         // data.append(image,this.state.file);
    
         this.props.updateDrone(data);

         
         setTimeout(() => {  this.props.history.push("/main/admin/viewalldrones");}, 1000);

        }    
      };

      render() {
        const { text, errors } = this.state;

        var imageuri = null;
   var droneidparam = null;
   var type = null;

   
   const dronedetails = this.props.drone;

   [dronedetails].map(dronedetails => 
   //imageuri ="data:image/png[jpg][jpeg];base64," + dronedetails.image,

  type = dronedetails.type,
   
   imageuri=dronedetails.image,
   droneidparam = dronedetails.drone_id
   )

   if(imageuri != null || imageuri != undefined)
   imageuri = imageuri.replace(/"/g, '');

    
        return (
          <div class="container">
             
                <h5>
                <div><b>Drone Details</b></div><br/>
                <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
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

                  <Form.Group controlId="type">
            <Form.Label>Type: </Form.Label>
            <Form.Control as="select" name="type" custom onChange={this.handleChange} value={this.state.type}>
              <option value="datacollection">Data Collection</option>
              <option value="spreading">Agriculture Spreading</option>
              <option value="monitoring">Monitoring</option>
              <option value="spraying">Spraying</option>
            </Form.Control>

                
                  </Form.Group>
                 
                  
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={this.state.size}
                    onChange={this.handleChange}
                    placeholder="Size"
                  />
                  {this.state.formErrors.sizeError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.sizeError}
                </div>
              ) : null}
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

                  {/*<Form.Group controlId="image">
                  <Form.Label>Change Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => this.handleImageChange(e)}
                  /></Form.Group>*/}

<Form.Group>
                  <Form.Label>Change Image</Form.Label>
        <Form.File
          type="file"
          id="custom-file"
          label={this.state.fileName}
          onChange={(e) => this.handleImageChange(e)}
          custom
        />
      </Form.Group>


                  <hr/>

                  <div><b>Hardware Specifications</b></div><br/>

                  <Form.Group controlId="wingspan">
                  <Form.Label>Wingspan</Form.Label>
                  <Form.Control
                    type="text"
                    name="wingspan"
                    value={this.state.wingspan}
                    onChange={this.handleChange}
                    placeholder="Wingspan"
                  />
                </Form.Group>

                <Form.Group controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleChange}
                    placeholder="weight"
                  />
                </Form.Group>

                  <Form.Group controlId="battery">
                  <Form.Label>Battery</Form.Label>
                  <Form.Control
                    type="text"
                    name="battery"
                    value={this.state.battery}
                    onChange={this.handleChange}
                    placeholder="Battery Type"
                  />
                </Form.Group>

                <Form.Group controlId="camera">
                  <Form.Label>Camera</Form.Label>
                  <Form.Control
                    type="text"
                    name="camera"
                    value={this.state.camera}
                    onChange={this.handleChange}
                    placeholder="Camera"
                  />
                </Form.Group>

                <Form.Group controlId="powerconsumption">
                  <Form.Label>Power Consumption</Form.Label>
                  <Form.Control
                    type="text"
                    name="powerconsumption"
                    value={this.state.powerconsumption}
                    onChange={this.handleChange}
                    placeholder="Power Consumption"
                  />
                </Form.Group>

                <hr/>
                <div><b>Flight Parameters</b></div><br/>

                <Form.Group controlId="flighttime">
                  <Form.Label>Flight Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="flighttime"
                    value={this.state.flighttime}
                    onChange={this.handleChange}
                    placeholder="Flight Time"
                  />
                </Form.Group>

                <Form.Group controlId="flightrange">
                  <Form.Label>Flight Range</Form.Label>
                  <Form.Control
                    type="text"
                    name="flightrange"
                    value={this.state.flightrange}
                    onChange={this.handleChange}
                    placeholder="Flight Range"
                  />
                </Form.Group>


                <Form.Group controlId="flightaltitude">
                  <Form.Label>Flight Altitude</Form.Label>
                  <Form.Control
                    type="text"
                    name="flightaltitude"
                    value={this.state.flightaltitude}
                    onChange={this.handleChange}
                    placeholder="Flight Altitude"
                  />
                </Form.Group>

                <Form.Group controlId="flightspeed">
                  <Form.Label>Flight Speed</Form.Label>
                  <Form.Control
                    type="text"
                    name="flightspeed"
                    value={this.state.flightspeed}
                    onChange={this.handleChange}
                    placeholder="Flight Speed"
                  />
                </Form.Group>

             

                <hr/>

                <div><b>Software Specifications</b></div><br/>

                <Form.Group controlId="flightplanningsoftware">
                  <Form.Label>Flight Planning Software</Form.Label>
                  <Form.Control
                    type="text"
                    name="flightplanningsoftware"
                    value={this.state.flightplanningsoftware}
                    onChange={this.handleChange}
                    placeholder="Flight Planning Software"
                  />
                </Form.Group>

                <Form.Group controlId="imagesoftware">
                  <Form.Label>Image Software</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagesoftware"
                    value={this.state.imagesoftware}
                    onChange={this.handleChange}
                    placeholder="Image Software"
                  />
                </Form.Group>
               

              {/*<Form.Group controlId="hardwarespecs">
                  <Form.Label>Hardware Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="hardwarespecs"
                    value={this.state.hardwarespecs}
                    onChange={this.handleChange}
                    placeholder="Hardware Specifications"
                  /></Form.Group>

<Form.Group controlId="softwarespecs">
                  <Form.Label>Software Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="softwarespecs"
                    value={this.state.softwarespecs}
                    onChange={this.handleChange}
                    placeholder="Software Specifications"
                  /></Form.Group>*/}


             
              
              <Button
                className="btn btn-primary"
                onClick={this.handleSubmit}
                type="submit"
              >
                Update Drone
              </Button>
              <br />
              <p className="text-danger"> {errors}</p>
              <p className="text-success"> {text}</p>
              <br />
            </Form></h5>
                              
          </div>
      

      
        );
      }


} 

  const mapStateToProps = (state) => ({
    dronestate: state.droneState,
    errors: state.errorState,
  });
  export default withRouter(connect(mapStateToProps, { updateDrone })(UpdateDroneForm));
