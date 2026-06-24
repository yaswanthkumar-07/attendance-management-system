import axios from "axios";

export const api = axios.create({
  baseURL: "https://attendance-management-system-we7p.onrender.com/api",
});