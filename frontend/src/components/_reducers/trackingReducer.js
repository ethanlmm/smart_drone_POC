import {
    SET_LOADING,
    TRACK_USER_DRONES
  } from "../_actions/types";
  
  const initialState = {
    drone : {},
    drones : [],
    loading: false,
    
  };
  
  export const trackingReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case TRACK_USER_DRONES:
        return {
          ...state,
          drones: action.payload,
          loading: false,
        };
        default:
        return { ...state };
    }
}