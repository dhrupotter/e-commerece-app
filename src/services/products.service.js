import axios from "axios";

export const getAllProductsService = async () => {
  const res = await axios.get("/api/products");
  return res;
};
