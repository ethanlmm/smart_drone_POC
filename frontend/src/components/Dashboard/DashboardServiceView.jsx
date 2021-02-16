import React from "react";
import "../../css/dashboardDroneView.css";
import {Row, Col} from 'reactstrap';

class DashboardServiceView extends React.Component {
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
            <div className="mainDiv1">
                <h2 className="heading">Service Details</h2>
                <div className="details">
                    <Row>
                        <Col md={4}>
                            <div className="key">Request Id:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.request_id}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Service Id:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.service_id}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Booking Date:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.service_date}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Drone Id:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.drone_id}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Session Time:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.session_time}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Number of Sessions:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.no_of_sessions}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Service Base Cost:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.service_basecost}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="key">Total Cost:</div>
                        </Col>
                        <Col>
                            <div className="val">{s.service_totalcost}</div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DashboardServiceView;