import {
    SET_LOADING,
    GET_DRONES,
    GET_ERRORS,
    CREATE_DRONE,
    UPDATE_DRONE,
    REMOVE_DRONE,
    SEARCH_DRONES,
    GET_DRONE_DETAILS,
    GET_AGRICULTURE_SERVICES,
    CREATE_AGRICULTURE_SERVICE,
    UPDATE_AGRICULTURE_SERVICE,
    REMOVE_AGRICULTURE_SERVICE
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
  
  // Get all Drones
  export const getDrones = () => (dispatch) => {
    dispatch(setLoading());
    axios
      .get(backendurl + "drones")
      .then((response) => {
        dispatch({
          type: GET_DRONES,
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

  // Get Drone details by id
  export const getDroneDetails = (params) => (dispatch) => {
    console.log("get drone details");
    dispatch(setLoading());
    axios
      .get(backendurl + "drones/getDroneById",{params})
      .then((response) => {
        dispatch({
          type: GET_DRONE_DETAILS,
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

  // create a drone
  export const createDrone = (data) => (dispatch) => {
    console.log("dispatched");
    const config = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      }
  }
    const form = Object.keys(data).reduce((f, k) => {
      f.append(k, data[k]);
      return f;
    }, new FormData());
    dispatch(setLoading());
    axios
      .post(backendurl + "drones/createdrone",form,config)
      .then((response) => {
        dispatch({
          type: CREATE_DRONE,
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

   // update a drone
   export const updateDrone = (data) => (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      }
  }
    const form = Object.keys(data).reduce((f, k) => {
      f.append(k, data[k]);
      return f;
    }, new FormData());
    axios
      .put(backendurl + "drones/updatedrone",form,config)
      .then((response) => {
        dispatch({
          type: UPDATE_DRONE,
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

   // delete a drone
   export const removeDrone = (params) => (dispatch) => {
    dispatch(setLoading());
    axios
      .put(backendurl + "drones/removedrone",params)
      .then((response) => {
        dispatch({
          type: REMOVE_DRONE,
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

   // search drones
   export const searchDrones = (params) => (dispatch) => {
     console.log("search drones");
    dispatch(setLoading());
    axios
      .get(backendurl + "drones/searchdrones",{params})
      .then((response) => {
        dispatch({
          type: SEARCH_DRONES,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };

   // Get all services by drone id
   export const getAgricultureServicesByDroneId = (params) => (dispatch) => {
    console.log("get service details");
    dispatch(setLoading());
    axios
      .get(backendurl + "agriservices/getServicesByDroneId",{params})
      .then((response) => {
        dispatch({
          type: GET_AGRICULTURE_SERVICES,
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

  // create a service
  export const createAgricultureService = (data) => (dispatch) => {
    console.log("dispatched");
    dispatch(setLoading());
    axios
      .post(backendurl + "agriservices/createagricultureservice",data)
      .then((response) => {
        dispatch({
          type: CREATE_AGRICULTURE_SERVICE,
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

   // update a drone
   export const updateAgricultureService = (data) => (dispatch) => {
    dispatch(setLoading());
    axios
      .put(backendurl + "agriservices/updateagricultureservice",data)
      .then((response) => {
        dispatch({
          type: UPDATE_AGRICULTURE_SERVICE,
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

  // delete a service
  export const removeService = (params) => (dispatch) => {
    dispatch(setLoading());
    axios
      .put(backendurl + "agriservices/removeagricultureservice",params)
      .then((response) => {
        dispatch({
          type: REMOVE_AGRICULTURE_SERVICE,
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
  
  