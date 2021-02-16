import {
    SET_LOADING,
    BOOK_DRONE_SERVICE,
    GET_SERVICE_REQUESTS,
    APPROVE_REQUEST,
    REJECT_REQUEST,
    UPDATE_BOOKING
  } from "../_actions/types";
  
  const initialState = {
    service : {},
    services: [],
    droneServiceRequests: [],
    loading: false,
    
  };
  
  export const serviceReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case BOOK_DRONE_SERVICE:
        return {
          ...state,
          responseStatus: action.payload,
        };
        case UPDATE_BOOKING:
          return {
            ...state,
            responseStatus: action.payload,
          };
      case GET_SERVICE_REQUESTS:
        return {
          ...state,
          droneServiceRequests: action.payload,
          loading: false,
        }; 
        case APPROVE_REQUEST:
        return {
          ...state,
          responseStatus: action.payload,
        }; 
        case REJECT_REQUEST:
        return {
          ...state,
          responseStatus: action.payload,
        };       
        default:
        return { ...state };
    }
}