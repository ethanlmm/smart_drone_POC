import {
    SET_LOADING,
    GET_ERRORS,
    UPDATE_ACCOUNT,
    GET_USER_DETAILS
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

  // Get User Details
  export const getUserDetails = (data) => (dispatch) =>{
    console.log("Get User Details");
    axios
      .post(backendurl+"users/getUserDetails",data)
      .then((response) => {
        dispatch({
          type:GET_USER_DETAILS,
          payload: response.data,
        })
      })
        .catch((error) =>{
          dispatch({
            type:GET_ERRORS,
            payload: error.response.data,
          }) 
        })
  }

  // Update Address Details
  export const updateAccount = (data) => (dispatch) => {
      console.log("updateaccount action api");
    dispatch(setLoading());
    axios
      .post(backendurl + "users/updateAccount",data)
      .then((response) => {
        dispatch({
          type: UPDATE_ACCOUNT,
          payload: response.data,
        });
        swal("Account Updated");
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };


  