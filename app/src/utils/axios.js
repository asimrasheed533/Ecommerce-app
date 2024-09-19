import baseAxios from "axios";

const axios = baseAxios.create({
  baseURL: "http://192.168.10.9:9000/api",
});

export default axios;
