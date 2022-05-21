import React, { useContext, useReducer } from "react";

// actions
import { GET_ARTICLES } from "./type";

// context
const MyContext = React.createContext();

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
};

// defaultState
const defaultState = { articles: [], name: "jogn" };

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
