import axios from "axios";
import store from "../store";
import * as commonActions from "../store/modules/common";

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

export const signupAxios = async (path, data, callback) => {
  console.log(data);
  // try {
  //   const res = await axios.post(`${url()}${path}`, data, {
  //     headers: {
  //       "content-type": "multipart/form-data"
  //     }
  //   });
  //   return callback(res);
  // } catch (e) {
  //   console.log(e);
  // }

  // var FormData = require('form-data');
  // var fs = require('fs');
  // var data = new FormData();
  // data.append('img', fs.createReadStream('/Users/osiyeon/Desktop/스크린샷 2021-05-13 오후 5.35.55.png'));
  // data.append('email', 'osi1@email.com');
  // data.append('password', '12345');
  // data.append('nickname', 'osi1');
  // data.append('region_bcode', '1111010100');
  // data.append('sector_no', '1');
  const headers = checkAuth();

  var config = {
    method: "post",
    url: `${url()}${path}`,
    headers: {
      headers,
      "content-type": "multipart/form-data"
      // ...data.getHeaders()
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
