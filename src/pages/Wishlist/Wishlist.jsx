import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";
import { getCartProductsService } from "../../services/cart.service";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addProductToCart,
  getIsProductInCart,
  removeProductFromCart,
  removeProductFromWishlist,
} from "../../utils/cart.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWishlistProductsService } from "../../services/wishlist.service";

import "./Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const isLogged = user?.token?.length > 0;
  const encodedToken = { headers: { authorization: user?.token } };
  const cart = user?.user?.cart;
  const wishlist = user?.user?.wishlist;

  const getWishlistProducts = async () => {
    try {
      const res = await getWishlistProductsService(user.token);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, wishlist: res.data.wishlist },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const res = await removeProductFromWishlist(productId, encodedToken);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, wishlist: res.data.wishlist },
      }));
      toast.success("Item removed from wishlist", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProductToCart = async (product) => {
    if (isLogged) {
      if (getIsProductInCart(cart, product?._id)) {
        navigate("/cart");
      } else {
        const res = await addProductToCart(product, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, cart: res.data.cart },
        }));

        toast.success("Item added to Cart", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Please login to continue", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/login");
    }
  };
  console.log(wishlist);
  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <div>
      <h2>Your Wishlist ({wishlist?.length})</h2>
      {wishlist.length !== 0 ? (
        <div className="wishlist-container">
          {wishlist?.map((product) => (
            <div className="product-card">
              <li key={product._id}>
                <Link key={product._id} to={`/products/${product._id}`}>
                  <div className="product-img-container">
                    <img
                      src={product.img}
                      atl={product.name}
                      className="product-img"
                    ></img>
                  </div>
                </Link>
                <div className="wishlist-card-details">
                  <div className="wishlist-product-details">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>

                  <p className="product-name">{product.desription}</p>
                  <div className="wishlist-btn-container">
                    <button
                      className="wishlist-btn"
                      onClick={() => handleRemoveFromWishlist(product._id)}
                    >
                      Remove from Wishlist
                    </button>
                    <button
                      className="wishlist-btn2"
                      onClick={() => handleAddProductToCart(product)}
                    >
                      {getIsProductInCart(cart, product._id)
                        ? "View in Cart"
                        : " Add to Cart"}
                    </button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h1>Your wishlist is empty!😞</h1>
          <div>
            <p>"Empty canvas, endless possibilities."</p>
            <p>
              Let your imagination soar as you fill your wishlist with our
              extraordinary collection.
            </p>
          </div>
          <button className="shop-now" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
