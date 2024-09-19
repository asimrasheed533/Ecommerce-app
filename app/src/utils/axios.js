import baseAxios from "axios";

const axios = baseAxios.create({
  baseURL: "http://192.168.0.106:9000/api",

});

export default axios;
