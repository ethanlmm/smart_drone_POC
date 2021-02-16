import React, { Component } from 'react';
import '../../css/droneMarker.css';
import droneImage from '../../common/images/mapDrone.png';
import {withRouter} from "react-router-dom";
class DroneMarker extends Component {


   handleClick = () => {
      this.props.history.push('/main/dashboardDroneLiveDataView', {
         data: this.props.data
       })
   }

    render() {
      return (
         <div id="marker" onClick={this.handleClick}>
            <img id="droneImage" src={droneImage} alt="drone"/>
            <div id="text">{this.props.data.drone_name}</div>
         </div>
      );
    }
}

export default withRouter(DroneMarker);