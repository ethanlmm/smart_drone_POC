/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";

import {withRouter} from "react-router-dom";

import '../../css/dashboard.css';

import axios from "axios";
import {properties} from "../../properties";
import DashboardMap from '../Dashboard/DashboardMap';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "./PanelHeader.jsx";

import {
  getDashboardPanelChart,
  getBarChart,
  // dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  // dashboard24HoursPerformanceChart,
} from "../../variables/charts.js";

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {totalFlights: [], allDronesLiveData: [], numApprovedRequests: 0, displayAllDrones: false, colors: [], previousOrders: null, ordersPriceChart : [], isAdmin: false, allServicesNames: [], allServicesTotal: [], allServices: {}, allUsers: [], allDrones: []};
  }

  componentDidMount = () => {
    const backendurl = properties.backendhost + "dashboard";
    var isAdmin = (localStorage.getItem("usertype").localeCompare("customer") === 0) ? false: true;

    var allServices = {}
    axios.get(backendurl + "/getAllServices")
    .then((res) => {
      var allServicesComponent = [];
      res.data.forEach(o => {
          if(!(o.service_id in allServices)){
            allServices[o.service_id] = {}
            allServices[o.service_id]['name'] = (o.name != undefined) ? o.name : "";
            allServices[o.service_id]['description'] = (o.description != undefined) ? o.description : "";
            allServices[o.service_id]['drone_id'] = (o.drone_id != undefined) ? o.drone_id : "";
            allServices[o.service_id]['basecost'] = (o.basecost != undefined) ? o.basecost : "";
            allServices[o.service_id]['servicestatus'] = (o.servicestatus != undefined) ? o.servicestatus : "";
            allServices[o.service_id]['total'] = 0;
            allServices[o.service_id]['data'] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
          }
          allServicesComponent.push(
            <tr>
              <td>{o.service_id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.drone_id}</td>
              <td>{o.basecost}</td>
              <td style={{color: (o.servicestatus === 'active') ? "green" : "red"}}>{o.servicestatus}</td>
            </tr>
          );
      })
      this.setState({allServices: allServices, allServicesComponent: allServicesComponent});
    })
    .catch((err) => {
      console.log(err);
    })
    
    if(!isAdmin){ // CUSTOMER
      axios.get(backendurl + "/previousOrders/sruthi.duvvuri1@gmail.com")
      .then((res) => {
        var lineChartData = {};
        var prevOrders = [];
        var chart = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var allServices = this.state.allServices;
        res.data.forEach(o => {
          if(!(o.service_id in allServices)){
            return;
          }
          var name = allServices[o.service_id]['name'];
          if(!(name in lineChartData)){
            console.log("");
            lineChartData[name] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
          }
          var total = parseInt(o.service_totalcost);
          allServices[o.service_id]['total'] += total;
          var date = new Date(o.service_date);
          var month = date.getMonth();
          chart[month] = chart[month] + total;
          lineChartData[name][month] += total;
          prevOrders.push(
              <tr onClick={() => this.handleServiceClick(o)} className="tableRow">
                <td>{o.request_id}</td>
                <td>{date.toString().split("GMT")[0]}</td>
                <td>{o.drone_id}</td>
                <td className="text-right">{o.service_totalcost}</td>
              </tr>
          )
        })
        var a = [];
        var b = [];
        for(const id in allServices){
          if(allServices[id]['total'] == 0){
            continue;
          }
          a.push(allServices[id]['name']);
          b.push(allServices[id]['total']);
        }
        var lineData = [];
        for(const data in lineChartData){
          console.log("loop " + data + lineChartData[data]);
          var temp = {};
          temp['label'] = data;
          temp['data'] = lineChartData[data];
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var bl = Math.floor(Math.random() * 256);
          temp['borderColor'] = "rgb(" + r + "," + g + "," + bl + ")";
          temp['backgroundColor'] = "rgba(255,255,255,0)";
          lineData.push(temp);
        }
        var servicesLineChart = {};
        servicesLineChart['labels'] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        servicesLineChart['datasets'] = lineData;
        this.setState({servicesLineChart: servicesLineChart, allServices: allServices,previousOrders: prevOrders, ordersPriceChart: chart, allServicesNames: a, allServicesTotal: b});
      })
      .catch((err) => {
        console.log(err);
      })

    }

    else{ // ADMIN
      axios.get(backendurl + "/getAllUsers")
      .then((res) => {
        var allUsers = [];
        res.data.forEach((o) => {
          allUsers.push(
            <tr className="tableRow" onClick={() => this.handleUsersClick(o)}>
              <td>{o.user_id}</td>
              <td>{o.displayName}</td>
              <td>{o.email}</td>
              <td className="text-right">{o.usertype}</td>
            </tr>
          )
        })
        this.setState({allUsers: allUsers, allUsersData: res.data});
        console.log("qweqweqwe", this.state.allUsers[0]);
      })
      .catch((err) => {
        console.log(err);
      })

      axios.get(backendurl + "/getAllRequests")
      .then((res) => {
        var allServices = this.state.allServices;
        console.log("allServices", allServices);
        var totalFlights = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var allRequests = [];
        var chart = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var lineChartData = {};
        var numNewRequests = 0;
        var numApprovedRequests = 0;
        res.data.forEach((o) => {
          if(!(o.service_id in allServices)){
            return;
          }
          var name = allServices[o.service_id]['name'];
          var date = new Date(o.service_date);
          var month = date.getMonth();
          totalFlights[month] += 1;
          if(lineChartData[name] == null){
            lineChartData[name] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
          }
          var total = parseInt(o.service_totalcost);
          allServices[o.service_id]['total'] += total;
          lineChartData[name][month] += total;
          chart[month] = chart[month] + total;
          var color = (o.request_status === "Approved") ? "Green" : "Red";
          if(o.request_status === "New"){
            numNewRequests = numNewRequests + 1;
          }
          if(o.request_status === "Approved"){
            numApprovedRequests = numApprovedRequests + 1;
          }
          allRequests.push(
            <tr className="tableRow" onClick={() => this.handleRequestsClick(o)}>
              <td>{o.request_id}</td>
              <td>{allServices[o.service_id]['name']}</td>
              <td>{o.email}</td>
              <td>{date.toString().split("GMT")[0]}</td>
              <td>{o.service_totalcost}</td>
              <td style={{color: color}}>{o.request_status}</td>
            </tr>
          )
        });
        var a = [];
        var b = [];
        for(const id in allServices){
          if(allServices[id]['total'] == 0){
            continue;
          }
          a.push(allServices[id]['name']);
          b.push(allServices[id]['total']);
        }
        console.log("totalflight", totalFlights);
        // console.log("loop", lineChartData['TryThis']);
        var lineData = [];
        var colors = [];
        for(const data in lineChartData){
          console.log("loop " + data + lineChartData[data]);
          var temp = {};
          temp['label'] = data;
          temp['data'] = lineChartData[data];
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var bl = Math.floor(Math.random() * 256);
          temp['borderColor'] = "rgb(" + r + "," + g + "," + bl + ")";
          colors.push("rgb(" + r + "," + g + "," + bl + ")");
          temp['backgroundColor'] = "rgba(255,255,255,0)";
          lineData.push(temp);
        }
        var servicesLineChart = {};
        servicesLineChart['labels'] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        servicesLineChart['datasets'] = lineData;
        
        this.setState({ totalFlights: totalFlights, numApprovedRequests: numApprovedRequests, numNewRequests: numNewRequests, colors: colors, allServicesNames: a, allServicesTotal: b, revenueChart: chart, allRequests: allRequests, servicesLineChart: servicesLineChart, allRequestsData: res.data })
        console.log("state set");
      })
      .catch((err) => {
        console.log(err);
      })

      axios.get(backendurl + "/getAllDrones")
      .then((res) => {
        var allDrones = []
        res.data.forEach((o) => {
          allDrones.push(
            <tr onClick={() => this.handleDroneClick(o)} className="tableRow">
              <td>{o.name}</td>
              <td>{o.type}</td>
              <td>{o.size}</td>
              <td className="text-right" style={{color: (o.status === "active") ? "green" : "red"}}>{o.status}</td>
            </tr>
          )
        })
        this.setState({allDrones: allDrones, allDronesData: res.data})
      })
      .catch((err) => {
        console.log(err);
      })

      axios.get(backendurl + "/getAllDronesLiveData")
      .then((res) => {
        this.setState({allDronesLiveData: res.data});
      })
      .catch((err) => {
        console.log(err);
      })
    }
    this.setState({isAdmin: isAdmin});
  }

  handleDroneClick = (o) => {
    this.props.history.push('/main/dashboardDroneView', {
      data: o
    })
  }

  handleServiceClick = (o) => {
    // const history = useHistory();
    this.props.history.push('/main/dashboardServiceView', {
      data: o
    })
  }

  handleRequestsClick = (o) => {
    this.props.history.push('/main/dashboardRequestsView', {
      data: o
    })
  }

  handleUsersClick = (o) => {
    this.props.history.push('/main/dashboardUsersView', {
      data: o,
      services: this.state.allServices
    })
  }

  handleUserSearchChange = (e) => {
    var term = e.target.value.toLowerCase();
    var data = this.state.allUsersData;
    var allUsers = [];
    data.forEach((o) => {
      if(o.user_id.toString().startsWith(term) || o.displayName.toLowerCase().startsWith(term) || o.email.toLowerCase().startsWith(term)){
        allUsers.push(
          <tr className="tableRow" onClick={() => this.handleUsersClick(o)}>
            <td>{o.user_id}</td>
            <td>{o.displayName}</td>
            <td>{o.email}</td>
            <td className="text-right">{o.usertype}</td>
          </tr>
        )
      }
    })
    this.setState({allUsers: allUsers});
  }

  handleRequestSearchChange = (e) => {
    var term = e.target.value.toLowerCase();
    var data = this.state.allRequestsData;
    console.log("in handle", data);
    var allServices = this.state.allServices;
    var allRequests = [];
    data.forEach((o) => {
      if(!(o.service_id in allServices)){
        return;
      }
      if(o.request_id.toString().startsWith(term) || allServices[o.service_id]['name'].toLowerCase().startsWith(term) || o.email.toLowerCase().startsWith(term) || (o.request_status && o.request_status.toLowerCase().startsWith(term))){
        var date = new Date(o.service_date);
        var color = (o.request_status === "Approved") ? "Green" : "Red";
        allRequests.push(
          <tr className="tableRow" onClick={() => this.handleRequestsClick(o)}>
            <td>{o.request_id}</td>
            <td>{allServices[o.service_id]['name']}</td>
            <td>{o.email}</td>
            <td>{date.toString().split("GMT")[0]}</td>
            <td>{o.service_totalcost}</td>
            <td style={{color: color}}>{o.request_status}</td>
          </tr>
        )
      }
    })
    this.setState({allRequests: allRequests});
  }

  handleDroneSearchChange = (e) => {
    var term = e.target.value.toLowerCase();
    var data = this.state.allDronesData;
    var allDrones = [];
    data.forEach((o) => {
      if((o.name && o.name.toLowerCase().startsWith(term)) || (o.type && o.type.toLowerCase().startsWith(term)) || (o.status && o.status.toLowerCase().startsWith(term)) || (o.size && o.size.startsWith(term))){
        allDrones.push(
          <tr onClick={() => this.handleDroneClick(o)} className="tableRow">
            <td>{o.name}</td>
            <td>{o.type}</td>
            <td>{o.size}</td>
            <td className="text-right" style={{color: (o.status === "active") ? "green" : "red"}}>{o.status}</td>
          </tr>
        )
      }
    })
    this.setState({allDrones: allDrones});
  }

  handleServicesSearchChange = (e) => {
    var term = e.target.value.toLowerCase();
    var data = this.state.allServices;
    var allServicesComponent = [];
    for(const o in data){
      if((o.toString().startsWith(term)) || (data[o].name && data[o].name.toLowerCase().startsWith(term)) || (data[o].description && data[o].description.toLowerCase().startsWith(term)) || (data[o].drone_id && data[o].drone_id.toString().startsWith(term)) || (data[o].servicestatus && data[o].servicestatus.startsWith(term) || (data[o].basecost && data[o].basecost.toString().startsWith(term)))){
        allServicesComponent.push(
          <tr>
            <td>{o}</td>
            <td>{data[o].name}</td>
            <td>{data[o].description}</td>
            <td>{data[o].drone_id}</td>
            <td>{data[o].basecost}</td>
            <td className="text-right" style={{color: (data[o].servicestatus === "active") ? "green" : "red"}}>{data[o].servicestatus}</td>
          </tr>
        )
      }
    }
    this.setState({allServicesComponent: allServicesComponent});
  }

  toggleDronesDisplay = () => {
    this.setState({
      displayAllDrones: !this.state.displayAllDrones
    })
  }

  toggleDisplayPreviousOrdersCustomers = () => {
    this.setState({
      displayPreviousOrdersCustomers: !this.state.displayPreviousOrdersCustomers
    })
  }

  toggleDisplayRequests = () => {
    this.setState({
      displayRequests: !this.state.displayRequests
    })
  }

  toggleDisplayAllServices = () => {
    this.setState({
      displayAllServices: !this.state.displayAllServices
    })
  }


  render() {
    console.log("allflighst", this.state.totalFlights);
    var dashboardPanelChart = getDashboardPanelChart();
    var barChart = getBarChart();
    var isAdmin = this.state.isAdmin;
    var doughnutChart = {
      data: {
        labels: this.state.allServicesNames,
        datasets: [{
          data: this.state.allServicesTotal,
          label: ""
        }]
      }
    }
    var totalFlightsData = {
      datasets: this.state.totalFlights,
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    if(!isAdmin){
      dashboardPanelChart.data.datasets[0].data = this.state.ordersPriceChart;
      dashboardPanelChart.data.datasets[0].label = "Total Cost in $";
      barChart.data.datasets[0].label = "Total expenditure in $";
      doughnutChart.data.datasets[0].label = "Total expenditure in $";

    } else {
      dashboardPanelChart.data.datasets[0].data = this.state.revenueChart;
      dashboardPanelChart.data.datasets[0].label = "Total Revenue in $";
      barChart.data.datasets[0].label = "Total revenue in $";
      doughnutChart.data.datasets[0].label = "Total revenue in $";
    }
    barChart.data.labels = this.state.allServicesNames;
    barChart.data.datasets[0].data = this.state.allServicesTotal;
    doughnutChart.data.datasets[0].backgroundColor = this.state.colors;

    return (
      <div id="mainDiv">
        {/* MAIN REVENUE CHART */}
        <h2><i class="fas fa-chart-line"></i> {(isAdmin) ? "Revenue" : "Expenditure"} History</h2>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          {this.state.isAdmin && <Row>
            <Col>
              <div className="infoCard">
                <div className="infoCardInfo">{this.state.allUsers.length}</div>
                <div className="infoCardTitle"><i style={{color: "orange"}}class="fas fa-users"></i> Customers</div>
              </div>
            </Col>
            <Col>
              <div className="infoCard">
                <div className="infoCardInfo">{this.state.numNewRequests}</div>
                <div className="infoCardTitle"><i style={{color: "red"}}class="fas fa-exclamation-circle"></i> New Service Requests</div>
              </div>
            </Col>
            <Col>
              <div className="infoCard">
                <div className="infoCardInfo">{this.state.allDrones.length}</div>
                <div className="infoCardTitle"><i style={{color: "green"}}class="fas fa-helicopter"></i> Total Drones</div>
              </div>
            </Col>
            <Col>
              <div className="infoCard">
                <div className="infoCardInfo">{this.state.numApprovedRequests}</div>
                <div className="infoCardTitle"><i style={{color: "violet"}}class="fas fa-plane-departure"></i> Total Flights</div>
              </div>
            </Col>
          </Row>}
          <Row>
            {/* PIE CHART */}
            <Col xs={12} md={6}>  
              <Card className="card-chart">
                <CardHeader style={{textAlign: "center"}}>
                  {/* <h5 className="card-category">Email Statistics</h5> */}
                  <CardTitle tag="h4"><i class="fas fa-chart-pie"></i> {((!isAdmin) ? "Expenditure" : "Revenue") + " by Service Type"}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                    height="140%"
                      data={doughnutChart.data}
                      // data={barChart.data}
                      // options={barChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* LINE CHART */}
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader style={{textAlign: "center"}}>
                  <CardTitle tag="h4"><i className="fas fa-file-contract"></i> Monthly Revenue by Service Type</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      height="120%"
                      data={this.state.servicesLineChart}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


          {/* {isAdmin && <Row>
            <Col>
              <Card className="card-chart">
                  <CardHeader style={{textAlign: "center"}}>
                    <CardTitle tag="h4"><i className="fas fa-file-contract"></i> Flights in the last 12 months</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        height="100%"
                        data={
                          totalFlightsData
                        }
                        options={dashboardAllProductsChart.options}
                      />
                    </div>
                  </CardBody>
                </Card>
            </Col>
          </Row>} */}


          {/* MAP */}
          <Row>  
            <Col md={12}>
              <Card className="card-chart">
                  <CardHeader style={{textAlign: "center"}}>
                    <CardTitle tag="h4"><i style={{color: "green"}} class="fas fa-map-marked-alt"></i> All Drone Locations</CardTitle>
                  </CardHeader>
                  <CardBody>
                  {/* <div id="droneMap"> */}
                    {/* <h3><i style={{color: "green"}} class="fas fa-map-marked-alt"></i> All Drone Locations</h3> */}
                    {this.state.allDronesLiveData.length != 0 && <DashboardMap data={this.state.allDronesLiveData}/>}
              {/* </div> */}
                  </CardBody>
                </Card>
              {/* <div id="droneMap">
                    <h3><i style={{color: "green"}} class="fas fa-map-marked-alt"></i> All Drone Locations</h3>
                    {this.state.allDronesLiveData.length != 0 && <DashboardMap data={this.state.allDronesLiveData}/>}
              </div> */}
            </Col>
          </Row>


          {/* ALL DRONES */}
          <Row>
            {isAdmin && <Col xs={12} md={12}>
              <Card className="card-tasks">
                <CardHeader className="headerTitle" onClick={this.toggleDronesDisplay}>
                  <CardTitle tag="h4"><i class="fas fa-helicopter"></i> All Drones</CardTitle>
                </CardHeader>
                {this.state.displayAllDrones && <CardBody>
                  <Input type="text" placeholder="Search drone by name, type, status..." onChange={this.handleDroneSearchChange}/>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th className="text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody  style={{fontSize: "5em"}}>
                      {this.state.allDrones}
                    </tbody>
                  </Table>
                </CardBody>}
              </Card>
            </Col>}
          </Row>

          {/* ALL CUSTOMERS / PREVIOUS ORDERS */}
          <Row>
            <Col xs={12} md={12}>
              <Card className="scrollTable">
                <CardHeader className="headerTitle" onClick={this.toggleDisplayPreviousOrdersCustomers}>
                  {/* <h5 className="card-category">All Persons List</h5> */}
                <CardTitle tag="h4">{(!isAdmin) ? <i class="fas fa-truck"></i> : <i class="fas fa-users"></i>} {(!isAdmin) ? "All Previous Orders" : "Customers"}</CardTitle>
                </CardHeader>
                {this.state.displayPreviousOrdersCustomers && <CardBody >
                  <Input type="text" placeholder="Search customer by id, name, email..." onChange={this.handleUserSearchChange}/>
                  <Table responsive>
                    <thead className="text-primary">
                      {!isAdmin && 
                        <tr>
                          <th>Request ID</th>
                          <th>Start Date</th>
                          <th>Drone ID</th>
                          <th className="text-right">Number of Sessions</th>
                        </tr>
                      }
                      {isAdmin && 
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th className="text-right">User Type</th>
                        </tr>
                      }
                    </thead>
                    <tbody  style={{fontSize: "5em"}}>
                      {!isAdmin && this.state.previousOrders}
                      {isAdmin && this.state.allUsers}
                    </tbody>
                  </Table>
                </CardBody>}
              </Card>
            </Col>
          </Row>

          
          {isAdmin && 
            <div>
            {/* REQUESTS */}
            <Row>
              <Col xs={12} md={12}>
                <Card>
                <CardHeader className="headerTitle" onClick={this.toggleDisplayRequests}>
                  <CardTitle tag="h4"><i class="fas fa-list-alt"></i> Requests</CardTitle>
                </CardHeader>
                {this.state.displayRequests && <CardBody>
                  <Input type="text" placeholder="Search requests by id, service name, requester email, status..." onChange={this.handleRequestSearchChange}/>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Requester Email</th>
                        <th>Service Date</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody style={{fontSize: "5em"}}>
                      {this.state.allRequests}
                    </tbody>
                  </Table>
                </CardBody>}
                </Card>
              </Col>
            </Row>

            {/* SERVICES OFFERED */}
            <Row>
              <Col xs={12} md={12}>
                <Card>
                <CardHeader className="headerTitle" onClick={this.toggleDisplayAllServices}>
                  <CardTitle tag="h4"><i class="fas fa-layer-group"></i> All Services Offered</CardTitle>
                </CardHeader>
                {this.state.displayAllServices && <CardBody>
                  <Input type="text" placeholder="Search Services by id, service name, drone id, basecost..." onChange={this.handleServicesSearchChange}/>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Service ID</th>
                        <th>Service Name</th>
                        <th>Description</th>
                        <th>Drone ID</th>
                        <th>Base Cost</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody  style={{fontSize: "5em"}}>
                      {this.state.allServicesComponent}
                    </tbody>
                  </Table>
                </CardBody>}
                </Card>
              </Col>
            </Row>

            </div>
          }

        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
