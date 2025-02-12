import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export async function fetchProducts() {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
}

export async function fetchProductById(id) {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
}
