import {
  FETCH_BEGIN,
  FETCH_FAILURE,
  FETCH_DATA_LOADED,
  FETCH_DATA_SUCCESS,
  FETCH_SLIDE_SUCCESS,
  UPDATE_SEARCH,
  UPDATE_CART,
  CLOSE_MCART,
  OPEN_MCART
} from "../types";

const initialState = {
  loading: false,
  searchText: "",
  categories: [],
  data: [],
  dishes: [],
  slides: [],
  cart: [],
  mcart: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        dishes: []
      };
    case FETCH_DATA_LOADED:
      return {
        ...state,
        loading: false,
        categories: action.payload.data.categories,
        data: action.payload.data.menu
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        dishes: action.payload.data
      };
    case FETCH_SLIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        slides: action.payload.data
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        searchText: action.payload.data
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload.data,
      };
    case OPEN_MCART:
      return {
        ...state,
        mcart: true
      };
    case CLOSE_MCART:
      return {
        ...state,
        mcart: false
      };

    default:
      return state;
  }
}
