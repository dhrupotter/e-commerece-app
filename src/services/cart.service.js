import axios from "axios";

export const getCartProductsService = async (encodedToken) => {
  const config = {
    headers: { authorization: encodedToken },
  };
  const res = await axios.get("/api/user/cart", config);
  console.log(res);
  return res;
};
