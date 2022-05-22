import React, { useContext, useReducer } from "react";

// actions
import {
  GET_ARTICLES,
  LOAD_MORE_ACTION,
  REGISTER,
  SIGN_IN,
  GET_CURRENT_USER,
} from "./type";

// context
const MyContext = React.createContext();

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_CURRENT_USER:
      console.log(action.payload);
      return {
        ...state,
        currentUser: {
          email: action.payload.email,
          _id: action.payload.id,
          role: action.payload.role || "",
          age: action.payload.age || "",
          lastname: action.payload.lastname || "",
          firstname: action.payload.firstname || "",
        },
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
  currentUser: {
    email: "",
    _id: "",
    role: "",
    age: "",
    lastname: "",
    firstname: "",
  },
};

// make error true
// dispatch action that calls the showToast
// pass a message
// create a clear function to remove all errors in state

// MyProvider
const MyProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  console.log("current user", state);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
