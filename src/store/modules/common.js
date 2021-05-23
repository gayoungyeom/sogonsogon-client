import { createAction, handleActions } from "redux-actions";

const SET_TOKEN = "common/GET_TOKEN";
const SET_REGION_BCODE = "common/SET_REGION_BCODE";
const SET_SECTOR_NO = "common/SET_SECTOR_NO";
const SET_NAV_TYPE = "common/SET_NAV_TYPE";
const IS_LOADING = "common/IS_LOADING";

export const setToken = createAction(SET_TOKEN, token => token);
export const setRegionBcode = createAction(
  SET_REGION_BCODE,
  regionBcode => regionBcode
);
export const setSectorNo = createAction(SET_SECTOR_NO, sectorNo => sectorNo);
export const setNavType = createAction(SET_NAV_TYPE, navType => navType);
export const isLoading = createAction(IS_LOADING, isLoading => isLoading);

const initialState = {
  token: "",
  regionBcode: "",
  sectorNo: "",
  navType: "first",
  isLoading: false
};

export default handleActions(
  {
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload
    }),
    [SET_REGION_BCODE]: (state, { payload }) => ({
      ...state,
      regionBcode: payload
    }),
    [SET_SECTOR_NO]: (state, { payload }) => ({
      ...state,
      sectorNo: payload
    }),
    [SET_NAV_TYPE]: (state, { payload }) => ({
      ...state,
      navType: payload
    }),
    [IS_LOADING]: (state, { payload }) => ({
      ...state,
      isLoading: payload
    })
  },
  initialState
);
