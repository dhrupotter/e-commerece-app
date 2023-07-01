import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";
import { getCartProductsService } from "../../services/cart.service";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, setUser } = useAuth();

  const getCartProducts = async () => {
    try {
      const res = await getCartProductsService(user.token);
      console.log(res);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    console.log(productId);
    try {
      const config = {
        headers: {
          authorization: user.token,
        },
      };
      const res = await axios.delete(`/api/user/cart/${productId}`, config);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  console.log(user);

  const cart = user.user.cart;

  return (
    <div>
      Your Cart
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
                <p className="product-name">{product.name}</p>

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
