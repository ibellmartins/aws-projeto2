import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // depois muda pro endereço da EC2
});

export default api;
