// import { Toast } from "react-toastify/dist/components";
import { useAuth } from "../contexts/auth.context";
import axios from "axios";

const addProductToCart = async (product, encodedToken) => {
  try {
    const res = await axios.post("/api/user/cart", { product }, encodedToken);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const addProductQuantity = async (productId, actionType, encodedToken) => {
  try {
    const res = await axios.post(
      `/api/user/cart/${productId}`,
      {
        action: {
          type: `${actionType}`,
        },
      },
      encodedToken
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const addProductToWishlist = async (product, encodedToken) => {
  try {
    const res = await axios.post(
      "/api/user/wishlist",
      { product },
      encodedToken
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getIsProductInCart = (cart, productId) => {
  return cart?.find((product) => (product._id === productId ? true : false));
};

const getIsProductInWishlist = (wishlist, productId) => {
  return wishlist?.find((product) =>
    product._id === productId ? true : false
  );
};

const removeProductFromWishlist = async (productId, encodedToken) => {
  try {
    const res = await axios.delete(
      `/api/user/wishlist/${productId}`,
      encodedToken
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

const removeProductFromCart = async (productId, encodedToken) => {
  try {
    const res = await axios.delete(`/api/user/cart/${productId}`, encodedToken);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export {
  addProductToCart,
  addProductQuantity,
  addProductToWishlist,
  getIsProductInCart,
  getIsProductInWishlist,
  removeProductFromWishlist,
  removeProductFromCart,
};
