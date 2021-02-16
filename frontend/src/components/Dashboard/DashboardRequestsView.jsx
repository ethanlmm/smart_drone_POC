import React from "react";

import "../../css/dashboardDroneView.css";

class DashboardRequestsView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount = () => {
        console.log("HI+++" + this.props.location.state.data.user_id);
    }

    render(){
        var s = this.props.location.state.data;
        var date = new Date(s.service_date);
        return (
            <div className="outsideDiv">
            <div className="mainDiv1">
                <h2>Request Details</h2>
                <h5>Request Id: {s.request_id}</h5>
                <h5>Drone Id: {s.drone_id}</h5>
                <h5>Service Id: {s.service_id}</h5>
                <h5>Session Time: {s.session_time}</h5>
                <h5>Number of Sessions: {s.no_of_sessions}</h5>
                <h5>Service Basecost: {s.service_basecost}</h5>
                <h5>Requester Email: {s.email}</h5>
                <h5>Service Date: {date.toString().split("GMT")[0]}</h5>
                <h5>Service Total Cost : {s.service_totalcost}</h5>
                <h5 style={{color: (s.request_status === "Approved") ? "green" : "black"}}>Request Status : {s.request_status}</h5>
            </div>
            </div>
        );
    }
}

export default DashboardRequestsView;