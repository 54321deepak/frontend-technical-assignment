import React, { useEffect } from "react";
import { FaCheckCircle, FaShoppingBag, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Heading from "../common/Heading";
import Button from "../common/Button";

const OrderSuccessModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate("/shop");
  };

  return (
    <div className="order-success-overlay">
      <div className="order-success-modal">
        <button className="success-close-btn" onClick={handleClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="success-icon-container">
          <FaCheckCircle className="main-success-icon" />
          <div className="success-pulse"></div>
        </div>

        <div className="success-content">
          <Heading level={2}>Order Placed Successfully!</Heading>
          <p>Thank you for your purchase. Your order <strong>#{orderDetails.id}</strong> has been received and is being processed.</p>

          <div className="order-summary-box">
            <div className="summary-item">
              <span>Total Amount:</span>
              <strong>${orderDetails.total.toFixed(2)}</strong>
            </div>
            <div className="summary-item">
              <span>Estimated Delivery:</span>
              <strong>3-5 Business Days</strong>
            </div>
          </div>

          <div className="modal-actions">
            <Button onClick={handleClose}>
              <FaShoppingBag /> Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
