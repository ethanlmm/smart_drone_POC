import {
    SET_LOADING,
    GET_ERRORS,
    GET_USER_ORDERS
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
  
  // Get User Orders
  export const getUserOrders = (data) => (dispatch) => {
    dispatch(setLoading());
    axios
      .post(backendurl + "orders/getUserOrders",data)
      .then((response) => {
        dispatch({
          type: GET_USER_ORDERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: error.response.data,
        // });
      });
      
  };
