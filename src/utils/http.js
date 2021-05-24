import axios from "axios";
import { navigate } from "gatsby";

import store from "../store";
import { setLoading } from "../store/modules/common";

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

const isError = e => {
  if (e.response) {
    if (e.response.status === 401) {
      alert(`로그인 시간 만료`);
      navigate("/login");
    } else {
      console.log(
        "Error: ",
        e.response.status,
        e.response.data,
        e.response.headers,
        e.response.config,
        e.response.message
      );
      alert(`${e.response.data.message}`);
    }
  } else if (e.request) {
    console.log("요청이 이루어졌으나 응답이 없음.");
    console.log("Error: ", e.request);
  } else {
    console.log("오류를 발생시킨 요청을 설정하는 중에 문제 발생.");
    console.log("Error: ", e.message);
  }
};

export const getData = async (path, callback) => {
  const headers = checkAuth();
  store.dispatch(setLoading(true));
  try {
    const res = await axios.get(`${url()}${path}`, {
      headers
    });
    callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};

export const postData = async (path, data, callback) => {
  const headers = checkAuth();
  store.dispatch(setLoading(true));

  try {
    const res = await axios.post(`${url()}${path}`, data, {
      headers
    });
    callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};

export const putData = async (path, data, callback) => {
  const headers = checkAuth();
  store.dispatch(setLoading(true));

  try {
    const res = await axios.put(`${url()}${path}`, data, {
      headers
    });
    callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};

export const deleteData = async (path, data, callback) => {
  const headers = checkAuth();
  store.dispatch(setLoading(true));

  try {
    const res = await axios.delete(`${url()}${path}`, {
      headers,
      data
    });
    callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};

export const login = async (path, data, callback) => {
  store.dispatch(setLoading(true));
  try {
    const res = await axios.post(`${url()}${path}`, data);
    return callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};

export const signup = async (path, fd, callback) => {
  store.dispatch(setLoading(true));

  try {
    const res = await axios.post(`${url()}${path}`, fd);
    return callback(res.data);
  } catch (e) {
    isError(e);
  }
  store.dispatch(setLoading(false));
};
