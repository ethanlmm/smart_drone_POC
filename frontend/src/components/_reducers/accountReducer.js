import {
  GET_USER_DETAILS,
    SET_LOADING,
    UPDATE_ACCOUNT,
  } from "../_actions/types";
  
  const initialState = {
    user : {},
    users : [],
    loading: false,
    
  };
  
  export const accountReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_USER_DETAILS:
        return{
          ...state,
          user:action.payload
        }
      case UPDATE_ACCOUNT:
        return {
          ...state,
          responseStatus: action.payload,
          loading: false,
        };
        default:
        return { ...state };
    }
}