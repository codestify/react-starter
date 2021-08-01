import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

export const getStore = () => {
  let composeEnhancers;

  const environmentSwitch = process.env.REACT_APP_MODE || process.env.MODE_ENV;

  if (environmentSwitch !== "production") {
    //use redux devtools with trace if available, or default to compose
    composeEnhancers =
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })) ||
      compose;
  } else {
    //no redux dev tools for production
    composeEnhancers = compose;
  }

  //create the redux store
  const store = createStore(
    reducers, //APP reducers
    composeEnhancers(
      //apply thunk as the middleware to the compose enhancers
      applyMiddleware(thunk)
    )
  );

  return store;
};