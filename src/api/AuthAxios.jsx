import axios from "axios";

const authAxios = axios.create({
  baseURL: "https://smartcampus-backend-cj1t.onrender.com"
});

export default authAxios;

