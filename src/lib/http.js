import axios from "axios";

const http = axios.create({
  baseURL: "https://mernstacknode.herokuapp.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const { intercept = true } = config;
  if (!intercept) return config;
  const token = JSON.parse(localStorage.getItem("userInfo")) || "";
  if (token.token) config.headers["authorization"] = token.token;
  return config;
});

export default http;
