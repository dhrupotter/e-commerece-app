import axios from "axios";

export const getWishlistProductsService = async (encodedToken) => {
  const config = {
    headers: { authorization: encodedToken },
  };
  const res = await axios.get("/api/user/wishlist", config);
  return res;
};
