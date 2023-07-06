import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";
import { getCartProductsService } from "../../services/cart.service";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { removeProductFromCart } from "../../utils/cart.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { user, setUser } = useAuth();
  const encodedToken = { headers: { authorization: user?.token } };

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
      const res = await removeProductFromCart(productId, encodedToken);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
    }
  };
  const cart = user.user.cart;

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div>
      <h2>Total Cart Items ({cart.length})</h2>
      <div>
        {cart.map((product) => (
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
                  onClick={() => handleRemoveFromCart(product._id)}
                >
                  Remove from Cart
                </button>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
