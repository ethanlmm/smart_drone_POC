import React from "react";
import "../../css/dashboardDroneView.css";
import "../../css/dashboard.css";
import axios from "axios";
import {properties} from "../../properties";
import {Row, Col, Table} from "reactstrap";


class DashboardUsersView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount = () => {
        const backendurl = properties.backendhost + "dashboard";
        console.log("HI+++" + this.props.location.state);
        var allServices = this.props.location.state.services;
        axios.get(backendurl + "/previousOrders/sruthi.duvvuri1@gmail.com")
        .then((res) => {
          var prevOrders = [];
          res.data.forEach(o => {
            if(!(o.service_id in allServices)){
                return;
            }
            var date = new Date(o.service_date);
            var month = date.getMonth();
            console.log("users", o);
            prevOrders.push(
                <tr onClick={() => this.handleServiceClick(o)} className="tableRow">
                  <td>{o.request_id}</td>
                  <td>{date.toString().split("GMT")[0]}</td>
                  <td>{this.props.location.state.services[o.service_id]['name']}</td>
                  <td>{o.drone_id}</td>
                  <td className="text-right">{o.service_totalcost}</td>
                </tr>
            )
          })
          this.setState({previousOrders: prevOrders});
        })
        .catch((err) => {
          console.log(err);
        })
    }

    handleServiceClick = (o) => {
        this.props.history.push('/main/dashboardServiceView', {
            data: o
        })
    }

    render(){
        var s = this.props.location.state.data;
        return (
            <div className="content">
                <Row>
                    <Col xs={12} md={12}>
                        <div className="mainDiv1">
                            <h2 className="heading">User Details</h2>
                            <div className="details">
                                <h5>ID: {s.user_id}</h5>
                                <h5>Name: {s.displayName}</h5>
                                <h5>Email: {s.email}</h5>
                                <h5>Type: {s.usertype}</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <div className="mainDiv1">
                        <h2 className="heading">{s.displayName}'s Previous Orders</h2>
                        <div className="details">
                        <Table responsive>
                            <thead className="text-primary">
                            <tr>
                                <th>Request ID</th>
                                <th>Date</th>
                                <th>Service Name</th>
                                <th>Drone ID</th>
                                <th className="text-right">Cost</th>
                            </tr>
                            </thead>
                            <tbody >
                            {this.state.previousOrders}
                            </tbody>
                        </Table>
                        </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardUsersView;