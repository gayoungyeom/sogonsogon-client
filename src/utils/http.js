import axios from "axios";
import store from "../store";
import * as commonActions from "../store/modules/common";

const devUrl = `http://localhost:4000`;
const pubUrl = ``;

const url = () => {
  if (process.env.NODE_ENV === "production") return pubUrl;
  else return devUrl;
};

const state = store.getState();
const authToken = state.common.token;

const headers = {
  Authorization: `Bearer ${authToken}`
};

export const get = async (path, callback) => {
  // commonActions.isLoading(true);
  try {
    const res = await axios.get(`${url()}${path}`, {
      headers
    });
    callback(res.data);
    // commonActions.isLoading(false);
  } catch (e) {
    console.log(e);
  }
  // commonActions.isLoading(false);
};

export const post = async (path, data, callback) => {
  try {
    const res = await axios.post(`${url()}${path}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return callback(res);
  } catch (e) {
    console.log(e);
  }
};

export const login = async (path, data, callback) => {
  try {
    const res = await axios.post(`${url()}${path}`, data);
    return callback(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const signup = async (path, data, callback) => {
  try {
    const res = await axios.post(`${url()}${path}`, data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  } catch (e) {
    console.log(e);
  }
};
