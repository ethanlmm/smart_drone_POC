import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DroneMarker from './DroneMarker';
class SimpleMap extends Component {

    constructor(){
        super();
        this.state = {
            allDrones : []
        }
    }

    // static defaultProps = {
    //   center: {
    //     lat: 37.338,
    //     lng: -121.88
    //   },
    //   zoom: 9
    // };

    componentDidMount = () => {
        console.log("dronw", this.props.data[0]);
        var data = this.props.data;
        var allDrones = [];
        for(var drone of data){
            allDrones.push(
                <DroneMarker
                    lat={drone.lat}
                    lng={drone.long}
                    data={drone}
                />
            );
        }
        this.setState({
            allDrones: allDrones
        });
    }
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCLulssIOcLavLzxBoxiNeAGd2dsXBKyN0' }}
            defaultCenter={{
                lat: 37.338,
                lng: -121.88
              }}
            defaultZoom={7}
          >
            {this.state.allDrones}
        </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default SimpleMap;