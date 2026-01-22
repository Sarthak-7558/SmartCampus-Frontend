import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.BASE_URL
});

export default authAxios;

