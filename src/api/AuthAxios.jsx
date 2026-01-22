import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export default authAxios;

