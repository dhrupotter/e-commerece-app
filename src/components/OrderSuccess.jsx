import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-cart">
      <h1>Your order is placed successfully</h1>
      <div>
        <p>Continue shopping</p>
      </div>
      <button className="shop-now" onClick={() => navigate("/products")}>
        Shop Now
      </button>
    </div>
  );
};

export default OrderSuccess;
