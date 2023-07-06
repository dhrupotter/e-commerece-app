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
      toast.success("Item removed from wishlist");
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

        toast.success("Item added to Cart");
      }
    } else {
      toast.error("Please login to continue");
      navigate("/login");
    }
  };

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <div>
      <h2>Your Wishlist ({wishlist?.length})</h2>
      <div>
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
              <div className="product-card-details">
                <p className="product-name">{product.name}</p>
                <p className="product-price">₹{product.price}</p>
                <p className="product-name">{product.desription}</p>

                <button
                  className="cart-btn"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                >
                  Remove from Wishlist
                </button>
                <button
                  className="cart-btn"
                  onClick={() => handleAddProductToCart(product)}
                >
                  {getIsProductInCart(cart, product._id)
                    ? "View in Cart"
                    : " Add to Cart"}
                </button>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
