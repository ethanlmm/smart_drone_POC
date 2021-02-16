import React from "react";

import {Row, Col} from 'reactstrap';

import "../../css/dashboardDroneView.css";

class DashboardDroneView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount = () => {
        console.log("HI+++" + this.props.location.state.data.user_id);
    }

    render(){
        var s = this.props.location.state.data;
        return (
            <div className="outsideDiv">
            <div className="mainDiv1" style={{padding: "2%"}}>
                <Row>
                    <Col>
                        <h2>Drone Details</h2>
                        <h5>Drone Id: {s.drone_id}</h5>
                        <h5>Name: {s.name}</h5>
                        <h5>Type: {s.type}</h5>
                        <h5>Size: {s.size}</h5>
                        <h5>Description: {s.description}</h5>
                        <h5 style={{color: (s.status === "active") ? "green" : "red"}}>Status: {s.status}</h5>
                        <h5>Hardware Specs: {s.hardwarespecs}</h5>
                        <h5>Software Specs: {s.softwarespecs}</h5>
                    </Col>
                    <Col>
                        <img style={{width: "100%", height: "auto", padding: "5%"}} src={s.image.substring(1, s.image.length-1)}/>
                    </Col>
                </Row>
            </div>
            </div>
        );
    }
}

export default DashboardDroneView;