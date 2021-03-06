import React from "react";
import { Provider } from "react-redux";

import store from "./src/store";

const reduxWrapper = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};

export default reduxWrapper;
