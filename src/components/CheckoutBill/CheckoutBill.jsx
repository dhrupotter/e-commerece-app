import React from "react";
import { useAuth } from "../../contexts/auth.context";
import "./CheckoutBill.css";
import { useNavigate } from "react-router-dom";

const CheckoutBill = ({ addr }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = user.user.cart;

  const cartItemPrices = cart.map((item) => item.price * item.qty);
  const totalDiscount = cart.reduce((acc, curr) => acc + curr.qty * 50, 0);
  const totalPrice = cartItemPrices.reduce((acc, curr) => acc + curr, 0);
  const shippingCharges = totalPrice - totalDiscount < 999 ? 50 : 0;
  const totalBillAmount = totalPrice - totalDiscount + shippingCharges;

  return (
    <div className="checkout-bill">
      <hr />
      <h3>Order Details</h3>
      <hr />
      <div className="order-details">
        <p>
          <b>Items</b>
        </p>
        <p>
          <b>Qty</b>
        </p>
      </div>
      <div className="order-details">
        {cart.map((item) => (
          <>
            <p>{item.name}</p>
            <p>{item.qty}</p>
          </>
        ))}
      </div>
      <hr />
      <h3>Price Details</h3>

      <div className="order-details">
        <p>Price ({cart.length})</p>
        <p>₹{totalPrice}</p>
      </div>
      <div className="order-details">
        <p>Discount</p>
        <p>- ₹{totalDiscount}</p>
      </div>
      <div className="order-details">
        <p>Coupon</p>
        <p>- ₹0</p>
      </div>
      <div className="order-details">
        <p>Shipping Charges</p>
        <p>{shippingCharges}</p>
      </div>
      <hr />
      <div className="order-details">
        <h3>Total Amount</h3>
        <h3>{totalBillAmount}</h3>
      </div>
      <hr />
      <h3>Deliver to</h3>
      <strong>{addr.recieverName}</strong>
      <p>
        {addr.addr1}, {addr.addr2}
      </p>
      <p>
        {addr.city} - {addr.pinCode}
      </p>
      <p>
        <b>Contact: </b>
        {addr.contact}
      </p>
      <hr />
      <button className="checkout-btn" onClick={() => navigate("/orderPlaced")}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutBill;
