import { createAction, handleActions } from "redux-actions";

const GET_PATH = "common/GET_PATH";

export const getPath = createAction(GET_PATH, curPath => curPath);

const initialState = {
  path: ""
};

export default handleActions(
  {
    [GET_PATH]: (state, action) => ({
      ...state,
      path: action.payload
    })
  },
  initialState
);
