import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // baseURL: `http://localhost:5000/api`,
  baseURL: `https://health-portal-api.onrender.com`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default api;
