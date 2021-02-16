import {
    SET_LOADING,
    TRACK_USER_DRONES,
    GET_ERRORS
  } from "./types";
  import axios from "axios";
  import swal from "sweetalert";
  import { properties } from "../../properties";

  const backendurl = properties.backendhost;

  
  // Set loading state
  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  

  // get Drone Tracking details based on user
  export const getTrackingDetailsByUser = (data) => (dispatch) => {
    console.log("get tracking details");
    dispatch(setLoading());
    axios
      .post(backendurl + "tracking/getTrackingDetailsByUser",data)
      .then((response) => {
        dispatch({
          type: TRACK_USER_DRONES,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };

  