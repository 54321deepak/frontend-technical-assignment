import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import SummaryRow from "../components/common/SummaryRow";
import QuantitySelector from "../components/common/QuantitySelector";
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
    toast.error("Removed from Cart");
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
      <EmptyState
        icon={FaShoppingCart}
        title="Your Cart is Empty"
        message="Looks like you haven't added anything to your cart yet."
        actionText="Start Shopping"
        actionLink="/shop"
      />
    );
  }
  return (
    <div className="cart-page container">
      <Heading level={1} align="center">Shopping Cart</Heading>
      <div className="cart-layout">
        <div className="cart-items-container">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.thumbnail} alt={item.title} />
              </Link>
              <div className="item-info">
                <div className="item-details">
                  <Link to={`/product/${item.id}`}>
                    <Heading level={3}>{item.title}</Heading>
                  </Link>
                  <p className="item-category">{item.category}</p>
                </div>
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
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                onDecrease={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              />
              <div className="item-price-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <Button
                className="remove-btn"
                onClick={() => handleRemove(item.id, item.title)}
                title="Remove item"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
          <div className="cart-actions-row flex">
            <Button
              as={Link}
              to="/shop"
              variant="outline"
              style={{ gap: "0.75rem" }}
            >
              <FaArrowRight style={{ transform: "rotate(180deg)" }} /> Continue
              Shopping
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              style={{
                color: "var(--error)",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              Clear Entire Cart
            </Button>
          </div>
        </div>
        <div className="cart-summary">
          <Heading level={3} className="section-title" style={{ fontSize: "1.5rem" }}>
            Order Summary
          </Heading>
          <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <SummaryRow
            label="Shipping Estimate"
            value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          />
          <SummaryRow label="Tax Estimate" value="$0.00" />
          <SummaryRow label="Total" value={`$${total.toFixed(2)}`} isTotal={true} />
            <Button fullWidth onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
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
