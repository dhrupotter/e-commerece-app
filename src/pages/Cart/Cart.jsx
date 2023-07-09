import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import { getCartProductsService } from "../../services/cart.service";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  addProductQuantity,
  addProductToWishlist,
  getIsProductInWishlist,
  removeProductFromCart,
} from "../../utils/cart.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Cart.css";

const Cart = () => {
  const { user, setUser } = useAuth();
  const config = { headers: { authorization: user?.token } };
  const wishlist = user.user.wishlist;

  const [selectedQuantity, setSelectedQuantity] = useState();

  const getCartProducts = async () => {
    try {
      const res = await getCartProductsService(user.token);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const res = await removeProductFromCart(productId, config);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddtoWishlist = async (product) => {
    try {
      if (getIsProductInWishlist(wishlist, product?._id)) {
        const res = await removeProductFromCart(product?._id, config);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, cart: res.data.cart },
        }));
      } else {
        const res = await addProductToWishlist(product, config);
        const res2 = await removeProductFromCart(product._id, config);
        setUser((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            cart: res2.data.cart,
            wishlist: res.data.wishlist,
          },
        }));
        toast.success("Item added to Wishlist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReduceQuantity = async (product) => {
    try {
      const res = await addProductQuantity(product?._id, "decrement", config);
      setUser((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          cart: res.data.cart,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncreaseQuantity = async (product) => {
    try {
      const res = await addProductQuantity(product?._id, "increment", config);
      setUser((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          cart: res.data.cart,
        },
      }));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cart = user.user.cart;

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div>
      <h2>Total Cart Items ({cart.length})</h2>
      <div className="cart-items-display">
        {cart.map((product) => (
          <div className="cart-item-card">
            <div className="cart-item-img-container">
              <Link key={product._id} to={`/products/${product._id}`}>
                <img
                  src={product.img}
                  atl={product.name}
                  className="cart-item-img"
                ></img>
              </Link>
            </div>
            <div className="cart-item-card-details">
              <p className="cart-item-name">{product.name}</p>
              <p className="cart-item-description">{product.description}</p>
              <p className="cart-item-price">₹{product.price * product.qty}</p>
              <div className="cart-item-qty">
                <button onClick={(e) => handleReduceQuantity(product)}>
                  -
                </button>{" "}
                {product?.qty}{" "}
                <button onClick={(e) => handleIncreaseQuantity(product)}>
                  +
                </button>
              </div>
              <div className="cart-btn-container">
                <button
                  className="cart-btn"
                  onClick={() => handleRemoveFromCart(product._id)}
                >
                  Remove from Cart
                </button>
                <button
                  className="cart-btn2"
                  onClick={() => handleAddtoWishlist(product)}
                >
                  Move to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
