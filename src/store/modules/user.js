import { createAction, handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";

const SET_INPUT = "user/SET_INPUT";
const SET_NAV_NAME = "user/SET_NAV_NAME";
const SET_MY_POSTS = "user/SET_MY_POSTS";
const RESET_INPUT = "user/RESET_INPUT";

export const setInput = createAction(SET_INPUT, input => input);
export const setNavName = createAction(SET_NAV_NAME, names => names);
export const setMyPosts = createAction(SET_MY_POSTS, posts => posts);
export const resetInput = createAction(RESET_INPUT);

const input = Map({
  email: "",
  password: "",
  password2: "",
  nickname: "",
  sector_no: "",
  region_bcode: "",
  img: ""
});

const initialState = Record({
  input: input,
  navNames: Map(),
  myPosts: List()
});

export default handleActions(
  {
    [SET_INPUT]: (state, { payload }) => {
      return state.setIn(["input", payload.key], payload.value);
    },
    [SET_NAV_NAME]: (state, { payload }) => {
      return state.set("navNames", payload);
    },
    [SET_MY_POSTS]: (state, { payload }) => {
      return state.set("myPosts", payload);
    },
    [RESET_INPUT]: state => {
      return state.setIn(["input"], input);
    }
  },
  initialState()
);
