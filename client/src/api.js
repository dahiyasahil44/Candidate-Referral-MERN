import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://candidate-referral-mern.onrender.com/api"
});

export default API;
