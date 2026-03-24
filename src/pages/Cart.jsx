import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import OrderSuccessModal from "../components/cart/OrderSuccessModal";
import "../styles/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState({ id: "", total: 0 });

  const { items } = useSelector((state) => state.cart);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.error(`${title} removed from cart`);
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.error("Cart cleared");
  };

  const handleCheckout = () => {
    const newOrderId = Math.floor(100000 + Math.random() * 900000);
    setOrderDetails({ id: newOrderId.toString(), total: total });
    setShowSuccess(true);
    dispatch(clearCart());
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
  };
  if (showSuccess) {
    return (
      <OrderSuccessModal
        isOpen={showSuccess}
        onClose={handleCloseModal}
        orderDetails={orderDetails}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <div className="empty-icon-wrapper">
          <FaShoppingCart size={50} color="var(--primary)" />
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="cart-page container">
      <h1 className="page-title">Your Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items-container">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-info">
                <Link to={`/product/${item.id}`}>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.category}</p>
                <p
                  style={{
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginTop: "0.25rem",
                  }}
                >
                  ${item.price}
                </p>
              </div>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <FaMinus size={12} />
                </button>
                <span
                  style={{
                    fontWeight: 700,
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  className="qty-btn"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <FaPlus size={12} />
                </button>
              </div>
              <div className="item-price-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id, item.title)}
                title="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="cart-actions-row flex">
            <Link
              to="/shop"
              className="btn btn-outline"
              style={{ gap: "0.75rem" }}
            >
              <FaArrowRight style={{ transform: "rotate(180deg)" }} /> Continue
              Shopping
            </Link>
            <button
              className="btn btn-outline"
              onClick={handleClear}
              style={{
                color: "var(--error)",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              Clear Entire Cart
            </button>
          </div>
        </div>
        <div className="cart-summary">
          <h3 className="section-title" style={{ fontSize: "1.5rem" }}>
            Order Summary
          </h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Estimate</span>
            <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax Estimate</span>
            <span>$0.00</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary full-width checkout-btn"
            onClick={handleCheckout}
          >
            Checkout Now
          </button>
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            Secure Payment Powered by Stripe
          </p>
        </div>
      </div>
      <OrderSuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseModal} 
        orderDetails={orderDetails} 
      />
    </div>
  );
};
export default Cart;
