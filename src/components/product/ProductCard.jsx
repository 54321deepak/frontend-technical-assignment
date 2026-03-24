import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaEye, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import "../../styles/ProductCard.css";
const ProductCard = ({ product, onRemove }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.error("Removed from Cart");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to Cart");
    }
  };
  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.error("Removed from Wishlist");
    } else {
      toast.success("Added to Wishlist");
    }
  };
  return (
    <div className="product-card">
      <div className="image-container">
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </Link>
        <div className="card-actions">
          {onRemove ? (
            <button
              className="action-btn delete"
              onClick={(e) => {
                e.preventDefault();
                onRemove(product.id);
              }}
              title="Remove item"
            >
              <FaTrash />
            </button>
          ) : (
            <button
              className={`action-btn wishlist ${isInWishlist ? "active" : ""}`}
              onClick={handleWishlist}
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FaHeart />
            </button>
          )}
          <button
            className={`action-btn cart ${isInCart ? "active" : ""}`}
            onClick={handleAddToCart}
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="product-info">
        <span className="category">{product.category}</span>
        <h3 className="title">{product.title}</h3>
        <div className="price-rating">
          <span className="price">${product.price}</span>
          <span className="rating">★ {product.rating}</span>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
