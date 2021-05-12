import { createAction, handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";

const SET_INPUT = "board/SET_INPUT";

export const setInput = createAction(SET_INPUT, input => input);

const inputInitial = Map({
  title: "",
  content: "",
  category: "region"
});

const initialState = Record({
  input: inputInitial
});

export default handleActions(
  {
    [SET_INPUT]: (state, { payload }) => {
      return state.setIn(["input", payload.key], payload.value);
    }
  },
  initialState()
);
