import axios from "axios";

export const getAllCategoriesService = async () => {
  const res = await axios.get("/api/categories");
  return res;
};
