import React, { Component } from "react";
import Login from "./Login";
import agriculturaldrones from "../../common/images/agriculturaldrones.jpg";

class LandingPage extends Component {
  render() {
    return (

      <div className="d-md-flex h-md-100 align-items-center">
        <div className="col-md-6 p-0 bg-indigo h-md-100">
          <div className="text-white d-md-flex align-items-center h-100 p-7 text-center justify-content-center">
            <div className="logoarea pt-5 pb-5">
                 <div className="header-wrapper header-full">
              {/* <div  styles={{backgroundImage: `url(${drone_image})`}}></div> */}
                 <img
                  src={agriculturaldrones}
                  width="900"
                  height="700"
                  alt="avatar"
                /> 
             
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
          <div className="d-md-flex align-items-right h-md-100 p-5 justify-content-center">
            <div className="container rounded p-5">
              <div className="container border-black">
                <span>
                  <br />
                  <div>
                    <h2 className="text-center text-success">Drone Cloud Platform</h2>
                  </div>
                </span>
              </div>
              <br />
              <br />
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
