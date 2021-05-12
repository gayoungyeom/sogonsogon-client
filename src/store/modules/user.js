import { createAction, handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";

const SET_INPUT = "user/SET_INPUT";
// const SET_INFO = "user/SET_INFO";

export const setInput = createAction(SET_INPUT, input => input);
// export const setInfo = createAction(SET_INFO, info => info);

const input = Map({
  email: "",
  password: "",
  password2: "",
  nickName: "",
  sector: "",
  region: "",
  image: ""
});

const initialState = Record({
  input: input
  // userInfo: Map()
});

export default handleActions(
  {
    [SET_INPUT]: (state, { payload }) => {
      return state.setIn(["input", payload.key], payload.value);
    }
    // [SET_INFO]: (state, { payload }) => {
    // return state.set("userInfo", payload);
    // }
  },
  initialState()
);
