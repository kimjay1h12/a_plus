import { View, Text } from "react-native";
import React, { createContext, useEffect, useReducer } from "react";

import themeReducer from "./reducer/themeReducer";
import auth from "./reducer/auth";

const genericData = {
  error: null,
  loading: false,
  data: [],
};
export const GlobalContext = createContext({
  themeState: { mode: "", value: "", textvalue: "" },
  themeDispatch: () => {},
});

const GlobalProvider = ({ children }) => {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    mode: "default",
    value: "#fff",
    textvalue: "white",
  });
  const [authState, authDispatch] = useReducer(auth, {
    isLoggedIn: false,
    error: null,
    loading: false,
    data: {},
  });
  return (
    <GlobalContext.Provider
      value={{
        themeState,
        themeDispatch,
        authState,
        authDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
