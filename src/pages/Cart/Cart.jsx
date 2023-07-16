import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import { getCartProductsService } from "../../services/cart.service";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const config = { headers: { authorization: user?.token } };
  const wishlist = user.user.wishlist;

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const cart = user.user.cart;

  const cartItemPrices = cart.map((item) => item.price * item.qty);
  const totalDiscount = cart.reduce((acc, curr) => acc + curr.qty * 50, 0);
  const totalPrice = cartItemPrices.reduce((acc, curr) => acc + curr, 0);
  const shippingCharges = totalPrice - totalDiscount < 999 ? 50 : 0;
  const totalBillAmount = totalPrice - totalDiscount + shippingCharges;

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <h2>Total Cart Items ({cart.length})</h2>
      {cart.length !== 0 ? (
        <div>
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
                  <p className="cart-item-price">
                    ₹{product.price * product.qty}
                  </p>
                  <div className="cart-item-qty">
                    <button
                      onClick={(e) => {
                        if (product?.qty > 1) {
                          handleReduceQuantity(product);
                        }
                      }}
                      disabled={product?.qty > 1 ? false : true}
                    >
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
          <div className="cart-bill-section">
            <div className="cart-bill">
              <h2>Price details</h2>
              <hr />
              <div>
                <p>Price ({cart.length})</p>
                <p>₹{totalPrice}</p>
              </div>
              <div>
                <p>Discount</p>
                <p>- ₹{totalDiscount}</p>
              </div>
              <div>
                <p>Coupon</p>
                <p>- ₹0</p>
              </div>
              <div>
                <p>Shipping Charges</p>
                <p>{shippingCharges}</p>
              </div>
              <hr />
              <div>
                <h3>Total Amount</h3>
                <h3>{totalBillAmount}</h3>
              </div>
              <hr />
              <p className="save-msg">
                You will save ₹{totalDiscount}.00 on this order
              </p>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h1>Your cart is empty!😞</h1>
          <div>
            <p>"Empty canvas, endless possibilities."</p>
            <p>
              Let your imagination soar as you fill your cart with our
              extraordinary collection.
            </p>
          </div>
          <button className="shop-now" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
