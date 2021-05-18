import axios from "axios";
import store from "../store";

const devUrl = `http://localhost:4000`;
const pubUrl = ``;

const url = () => {
  if (process.env.NODE_ENV === "production") return pubUrl;
  else return devUrl;
};

const checkAuth = () => {
  const state = store.getState();
  const authToken = state.common.token;
  return {
    Authorization: `Bearer ${authToken}`
  };
};

export const get = async (path, callback) => {
  const headers = checkAuth();
  try {
    const res = await axios.get(`${url()}${path}`, {
      headers
    });
    callback(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const postData = async (path, data, callback) => {
  const headers = checkAuth();
  try {
    const res = await axios.post(`${url()}${path}`, data, {
      headers
    });
    callback(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const put = async (path, data, callback) => {
  const headers = checkAuth();
  try {
    const res = await axios.put(`${url()}${path}`, data, {
      headers
    });
    callback(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (path, data, callback) => {
  const headers = checkAuth();
  try {
    const res = await axios.delete(`${url()}${path}`, {
      headers,
      data
    });
    callback(res.data);
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

export const signup = async (path, fd, callback) => {
  try {
    const res = await axios.post(`${url()}${path}`, fd);
    return callback(res.data);
  } catch (e) {
    console.log(e);
  }
};
