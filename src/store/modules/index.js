import { combineReducers } from "redux";
import common from "./common";
import user from "./user";
import board from "./board";

export default combineReducers({
  common,
  user,
  board
});
