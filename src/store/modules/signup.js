import { createAction, handleActions } from "redux-actions";

const SET_INFO = "signup/SET_INFO";

export const setInfo = createAction(SET_INFO, info => info);

const initialState = {
  email: "",
  password: "",
  password2: "",
  nickName: "",
  sector: "",
  region: "",
  image: ""
};

export default handleActions(
  {
    [SET_INFO]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value
    })
  },
  initialState
);
