import axios from "axios";

const authAxios = axios.create({
  baseURL: BASE_URL
});

export default authAxios;

