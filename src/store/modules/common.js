import { createAction, handleActions } from "redux-actions";

const SET_TOKEN = "common/GET_TOKEN";
const SET_REGION_NO = "common/SET_REGION_NO";
const SET_SECTOR_NO = "common/SET_SECTOR_NO";
const IS_LOADING = "common/IS_LOADING";

export const setToken = createAction(SET_TOKEN, token => token);
export const setRegionNo = createAction(SET_REGION_NO, regionNo => regionNo);
export const setSectorNo = createAction(SET_SECTOR_NO, sectorNo => sectorNo);
export const isLoading = createAction(IS_LOADING, isLoading => isLoading);

const initialState = {
  token: "",
  regionNo: "",
  sectorNo: "",
  isLoading: false
};

export default handleActions(
  {
    [SET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload
    }),
    [SET_REGION_NO]: (state, action) => ({
      ...state,
      regionNo: action.payload
    }),
    [SET_SECTOR_NO]: (state, action) => ({
      ...state,
      sectorNo: action.payload
    }),
    [IS_LOADING]: (state, action) => ({
      ...state,
      isLoading: action.payload
    })
  },
  initialState
);
