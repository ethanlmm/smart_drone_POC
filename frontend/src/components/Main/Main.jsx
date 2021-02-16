import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../navBar/NavBar";
import DroneCatalog from "../admin/DroneCatalog";
import SearchDrones from "../admin/SearchDrones";
import ViewAllDrones from "../admin/ViewAllDrones";
import AdminDroneDetails from "../admin/AdminDroneDetails";
import CustomerDroneDetails from "../Customer/CustomerDroneDetails";
import AdminAgricultureServiceCatalog from "../admin/AdminAgricultureServiceCatalog";
import CustomerAgricultureServiceCatalog from "../Customer/CustomerAgricultureServiceCatalog";
import CreateAgricultureService from "../admin/CreateAgricultureService";
import UpdateAgricultureService  from "../admin/UpdateAgricultureService";
import BillingView from "../Home/BillingView";
import ReviewServiceRequests  from "../BookingService/ReviewServiceRequests";
import Account from "../Account/Account";
import MyOrders from "../Orders/MyOrders";
import DashboardServiceView from "../Dashboard/DashboardServiceView";
import DashboardDroneView from "../Dashboard/DashboardDroneView";
import DashboardRequestsView from "../Dashboard/DashboardRequestsView";
import DashboardUsersView from "../Dashboard/DashboardUsersView";
import Dashboard from "../Dashboard/Dashboard";
import userTracking from "../Tracking/userTracking";
import DashboardDroneLiveDataView from "../Dashboard/DashboardDroneLiveDataView";

class Main extends Component {
   componentDidMount() {
  //   this.props.getUserProfile();
   }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
        </div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/home" component={Home} />
            <Route path="/main/dashboard" component={Dashboard} />
            <Route path="/main/admin/createdrone" component={DroneCatalog} />
            <Route path="/main/admin/searchdrones" component={SearchDrones} />
            <Route path="/main/admin/viewalldrones" component={ViewAllDrones} />
            <Route path="/main/admindronedetails" component={AdminDroneDetails}/> 
            <Route path="/main/customerdronedetails" component={CustomerDroneDetails}/> 
            <Route path="/main/adminservicecatalog" component={AdminAgricultureServiceCatalog}/> 
            <Route path="/main/customerservicecatalog" component={CustomerAgricultureServiceCatalog}/>
            <Route path="/main/createservice" component={CreateAgricultureService}/> 
            <Route path="/main/updateservice" component={UpdateAgricultureService}/> 
            <Route path="/main/admin/reviewServiceRequests" component={ReviewServiceRequests}/>
            <Route path="/main/customer/account" component={Account}/>
            <Route path="/main/customer/orders" component={MyOrders}/>
            <Route path="/main/updateservice" component={UpdateAgricultureService}/>
            <Route path="/main/dashboardServiceView" component={DashboardServiceView}/> 
            <Route path="/main/dashboardDroneView" component={DashboardDroneView}/> 
            <Route path="/main/dashboardRequestsView" component={DashboardRequestsView}/> 
            <Route path="/main/dashboardUsersView" component={DashboardUsersView}/> 
            <Route path="/main/customer/billing" component={BillingView}/> 
            <Route path="/main/customer/tracking" component={userTracking}/>
            <Route path="/main/dashboardDroneLiveDataView" component={DashboardDroneLiveDataView}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
