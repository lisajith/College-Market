import axios from "axios";

const API = axios.create({
  baseURL: "https://college-market-ten.vercel.app"
});

// Items
export const fetchItems = () => API.get("/items");
export const createItem = (newItem) => API.post("/items", newItem);

// Auth
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);