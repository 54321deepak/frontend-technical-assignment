import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const QuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  disabled = false,
  className = "",
  size = "md" 
}) => {
  return (
    <div className={`quantity-selector-standard ${size === 'xl' ? 'qty-xl' : ''} ${className}`}>
      <button 
        className="qty-pill-btn" 
        onClick={(e) => { e.preventDefault(); onDecrease(); }}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        <FaMinus size={14} />
      </button>
      
      <span className="qty-val">{quantity}</span>
      
      <button 
        className="qty-pill-btn" 
        onClick={(e) => { e.preventDefault(); onIncrease(); }}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
