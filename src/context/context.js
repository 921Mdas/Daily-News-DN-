import React, { useReducer } from "react";

// reducer actions
import {
  GET_ARTICLES,
  UPDATE_INIT_SORT,
  GET_CURRENT_USER,
  SIGN_IN_OK,
  AUTH_OK,
  AUTH_NOT_OK,
  SIGN_OUT,
  CHANGE_LAYOUT,
  GET_FAV_ARTICLES,
} from "./type";

// context
const MyContext = React.createContext();

// default user details
export const userDefault = {
  email: "",
  _id: "",
  role: "",
  age: "",
  lastname: "",
  firstname: "",
};

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_FAV_ARTICLES:
      return { ...state, favorites: [...state.favorites, ...action.payload] };
    case UPDATE_INIT_SORT:
      return {
        ...state,
        initSort: { ...state.initSort, limit: action.payload },
      };
    case CHANGE_LAYOUT:
      return { ...state, layout: action.payload };
    case GET_CURRENT_USER:
      return { ...state, registered: true };
    case AUTH_OK:
      return {
        ...state,
        isAuth: true,
      };
    case AUTH_NOT_OK:
      return { ...state, isAuth: null, currentUser: userDefault };
    case SIGN_IN_OK:
      return {
        ...state,
        isAuth: true,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        currentUser: userDefault,
        isAuth: null,
      };

    default:
      return state;
  }
};

// defaultState
const defaultState = {
  articles: [],
  initSort: { sortBy: "_id", order: "asc", limit: 8 },
  currentUser: userDefault,
  isAuth: null,
  layout: "",
  favorites: [],
};

// MyProvider
const MyProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };

// TIPS
// make error true
// dispatch action that calls the showToast
// pass a message
// create a clear function to remove all errors in state
