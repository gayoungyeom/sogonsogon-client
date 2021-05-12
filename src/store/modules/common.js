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
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload
    }),
    [SET_REGION_NO]: (state, { payload }) => ({
      ...state,
      regionNo: payload
    }),
    [SET_SECTOR_NO]: (state, { payload }) => ({
      ...state,
      sectorNo: payload
    }),
    [IS_LOADING]: (state, { payload }) => ({
      ...state,
      isLoading: payload
    })
  },
  initialState
);
