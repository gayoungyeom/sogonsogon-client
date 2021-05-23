import { createAction, handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";

const SET_INPUT = "board/SET_INPUT";
const SET_BEST_POSTS = "board/SET_BEST_POSTS";
const SET_ALL_POSTS = "board/SET_ALL_POSTS";
const SET_POST = "board/SET_POST";

const SET_COMMENT = "board/SET_COMMENT";
const SET_COMMENTS = "board/SET_COMMENTS";
const SET_NEXT_COMMENTS = "board/SET_NEXT_COMMENTS";
const DELETE_COMMENT = "board/DELETE_COMMENT";

export const setInput = createAction(SET_INPUT, input => input);
export const setBestPosts = createAction(SET_BEST_POSTS, bests => bests);
export const setAllPosts = createAction(SET_ALL_POSTS, alls => alls);
export const setPost = createAction(SET_POST, post => post);

export const setComment = createAction(SET_COMMENT, comment => comment);
export const setComments = createAction(SET_COMMENTS, comments => comments);
export const setNextComments = createAction(SET_NEXT_COMMENTS, next => next);
export const deleteComment = createAction(DELETE_COMMENT, no => no);

const inputInitial = Map({
  title: "",
  content: "",
  category: "region",
  category_no: ""
});

const initialState = Record({
  input: inputInitial,
  bestPosts: List(),
  allPosts: List(),
  post: Map(),
  comment: "",
  comments: List(),
  nextComments: List()
});

export default handleActions(
  {
    [SET_INPUT]: (state, { payload }) => {
      return state.setIn(["input", payload.key], payload.value);
    },
    [SET_BEST_POSTS]: (state, { payload }) => {
      return state.set("bestPosts", payload);
    },
    [SET_ALL_POSTS]: (state, { payload }) => {
      return state.set("allPosts", payload);
    },
    [SET_POST]: (state, { payload }) => {
      return state.set("post", payload);
    },
    [SET_COMMENT]: (state, { payload }) => {
      return state.set("comment", payload);
    },
    [SET_COMMENTS]: (state, { payload }) => {
      return state.set("comments", payload);
    },
    [SET_NEXT_COMMENTS]: (state, { payload }) => {
      payload.map(c => state.comments.push(c));
      return state;
    },
    [DELETE_COMMENT]: (state, { payload }) => {
      return state.deleteIn(["comments", payload]);
    }
  },
  initialState()
);
