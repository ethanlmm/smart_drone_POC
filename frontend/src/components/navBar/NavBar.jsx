import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  Button
} from "react-bootstrap";
import firebase from "firebase";
import DropdownButton from "react-bootstrap/DropdownButton";


class Navigationbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    // logout logic
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        localStorage.clear(); //for localStorage
        window.location.href = "/";
      })
      .catch(function (error) {
        // An error happened.
        console.log("Error occurred while logging out");
      });
  };

  onSearchClick = (e) => {
    e.preventDefault();

   // window.location.href = "/main/admin/search";
  };

  render() {
    let displayName;
    let usertype;
    let uid = localStorage.getItem("uid");
    if (uid) {
        displayName = localStorage.getItem("displayName");
        usertype = localStorage.getItem("usertype");

    }
 

    var logoutButton, menuButtons, searchButton;

    logoutButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onLogoutClick}
        >
          <i className="fas fa-sign-out-alt pr-2"></i><b>Logout</b>
        </Link>
      </div>
    );

    searchButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onSearchClick}
        >
          Search
        </Link>
      </div>
    );

  

    if (usertype === "customer") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {displayName}</h5>
            </Nav.Item>
          </Nav>
          <Nav className="mr-auto-right mr-sm-2">
          <Nav.Link href="/main/home"><h5 >Home</h5></Nav.Link>
          <Nav.Link href="/main/dashboard"><h5>Dashboard</h5></Nav.Link>
          <Nav.Link href="/main/admin/searchdrones"><h5>Search Drones</h5></Nav.Link>
          <Nav className="ml-auto">
          <Nav className="mr-auto-right align-right">
          <DropdownButton  id="dropdown-basic-button" title="Account">
            <Dropdown.Item href="/main/customer/account">
            <h5> My Account </h5>
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/orders">
            <h5> My Service Requests </h5>
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/tracking">
            <h5> Tracking and Monitoring </h5>
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/billing">
            <h5> Billing </h5>
            </Dropdown.Item>
          </DropdownButton>
          </Nav>      
          </Nav>
           <Nav.Link href="/main/cart">
            {/* <Button>
              {" "}
              <i className="fa fa-shopping-cart" aria-hidden="true">
                Cart{" "}
              </i>
            </Button> */}
          </Nav.Link> 
          </Nav>
        </div>
      );
    } else if (usertype === "admin") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {displayName}</h5>
            </Nav.Item>
          </Nav>
          <Nav className="mr-auto-right mr-sm-2">
          <Nav.Link href="/main/home"><h5>Home</h5></Nav.Link>
          <Nav.Link href="/main/dashboard"><h5>Dashboard</h5></Nav.Link>
          <Nav className="ml-auto">
         <DropdownButton id="dropdown-basic-button" title="Drone Catalog">
          <Dropdown.Item href="/main/admin/viewalldrones"><h5>View All Drones</h5></Dropdown.Item>
          <Dropdown.Item href="/main/admin/createdrone"><h5>Create Drone</h5></Dropdown.Item>
          <Dropdown.Item href="/main/admin/searchdrones"><h5>Search Drones</h5></Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Monitoring">
        <Dropdown.Item href="/main/admin/reviewServiceRequests"><h6>Review Drone Service Requests</h6></Dropdown.Item>
        </DropdownButton>
        </Nav>
        </Nav>
        </div>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
          <Navbar.Brand>
            <Link to="/home" className="nav-link" href="#"></Link>
          </Navbar.Brand>
          {menuButtons}
          <Nav.Link>{logoutButton}</Nav.Link>
        </nav>
      </div>
    );
  }
}

export default Navigationbar;
