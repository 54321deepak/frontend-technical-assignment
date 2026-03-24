import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import ProductCard from "../components/product/ProductCard";
import toast from "react-hot-toast";
import "../styles/Wishlist.css";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <div className="empty-icon-wrapper">
          <FaHeart size={50} color="var(--primary)" />
        </div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you like to find them easily later.</p>
        <Link to="/shop" className="btn btn-primary">
          Go to Shop
        </Link>
      </div>
    );
  }
  return (
    <div className="wishlist-page container">
      <h1 className="page-title">My Wishlist</h1>
      <div className="products-grid grid">
        {items.map((product) => (
          <div key={product.id} className="wishlist-item-wrapper">
            <ProductCard
              product={product}
              onRemove={(id) => {
                dispatch(removeFromWishlist(id));
                toast.error("Removed from Wishlist");
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;
