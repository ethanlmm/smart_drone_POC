import {
    SET_LOADING,
    GET_USER_ORDERS
  } from "../_actions/types";
  
  const initialState = {
    order : {},
    orders: [],
    loading: false,
    
  };
  
  export const orderReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_USER_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
        default:
        return { ...state };
    }
}