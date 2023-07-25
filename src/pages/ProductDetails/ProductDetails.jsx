import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { FaHandHoldingHeart, FaTag } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { TbHeartPlus } from "react-icons/tb";

import { toast } from "react-toastify";

import "./ProductDetails.css";
import { useProducts } from "../../contexts/products.context";
import {
  addProductToCart,
  addProductToWishlist,
  getIsProductInCart,
  getIsProductInWishlist,
  removeProductFromWishlist,
} from "../../utils/cart.utils";
import { useAuth } from "../../contexts/auth.context";

const ProductDetails = () => {
  const { user, setUser } = useAuth();
  const { productId } = useParams();
  const { allProducts } = useProducts();
  const singleProduct = allProducts.find(
    (product) => product._id === productId
  );
  const navigate = useNavigate();
  const isLogged = user?.token?.length > 0;
  const encodedToken = { headers: { authorization: user?.token } };
  const cart = user?.user?.cart;
  const wishlist = user?.user?.wishlist;

  const handleAddProductToWishlist = async (product) => {
    if (isLogged) {
      if (getIsProductInWishlist(wishlist, product?._id)) {
        const res = await removeProductFromWishlist(product._id, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item removed from Wishlsit", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await addProductToWishlist(product, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item added to Wishlist", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      navigate("/login");
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

  return (
    <div className="product-details-section">
      <section className="product-details-img-container">
        <img
          className="product-details-img"
          src={singleProduct.img}
          alt={singleProduct.name}
        ></img>
      </section>
      <section className="product-description">
        {singleProduct.bestseller ? (
          <div className="bestseller">BESTSELLER</div>
        ) : (
          <></>
        )}
        <h1>{singleProduct.name}</h1>
        <div className="price-ratings">
          <p>
            <b>MRP:</b> ₹{singleProduct.price}
          </p>
          <p>Ratings: {singleProduct.ratings.rating}</p>
        </div>
        <hr />
        <div className="tags">
          <p>
            <FaHandHoldingHeart /> 100% Handmade
          </p>
          <p>
            <FaTag /> Fastest Delivery
          </p>
          <p>
            <FaTag /> Cash on Delivery available
          </p>
        </div>
        <hr />
        <div>
          <p className="availability">
            Availability:{" "}
            <span
              style={{
                color: singleProduct.inStock ? "green" : "red",
              }}
            >
              {singleProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
        <div className="single-product-btn-container">
          <button
            className="single-product-wishlist-btn"
            onClick={() => handleAddProductToWishlist(singleProduct)}
          >
            {getIsProductInWishlist(wishlist, singleProduct?._id) ? (
              <TiHeartFullOutline />
            ) : (
              <TbHeartPlus />
            )}
          </button>
          <button
            className={
              getIsProductInCart(cart, singleProduct._id)
                ? "product-card-cart-btn2"
                : "product-card-cart-btn"
            }
            onClick={() => handleAddProductToCart(singleProduct)}
          >
            {getIsProductInCart(cart, singleProduct._id)
              ? "View in bag"
              : "Add to Bag"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
