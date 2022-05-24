import React, { useContext, useReducer } from "react";

// actions
import {
  GET_ARTICLES,
  LOAD_MORE_ACTION,
  REGISTER,
  SIGN_IN,
  GET_CURRENT_USER,
  SIGN_IN_OK,
  AUTH_OK,
  AUTH_NOT_OK,
  SIGN_OUT,
  CHANGE_LAYOUT,
} from "./type";

// context
const MyContext = React.createContext();

// default user
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
    case CHANGE_LAYOUT:
      return { ...state, layout: action.payload };
    case AUTH_OK:
      return {
        ...state,
        isAuth: true,
        currentUser: { ...state.currentUser, ...action.payload },
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
    case LOAD_MORE_ACTION:
      return {
        ...state,
        initSort: { ...state.initSort, limit: action.payload },
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
};

// make error true
// dispatch action that calls the showToast
// pass a message
// create a clear function to remove all errors in state

// MyProvider
const MyProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  console.log(state);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
