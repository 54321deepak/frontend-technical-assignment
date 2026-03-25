import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import ProductCard from "../components/product/ProductCard";
import Heading from "../components/common/Heading";
import EmptyState from "../components/common/EmptyState";
import { FaHeartBroken } from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/Wishlist.css";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  if (items.length === 0) {
    return (
      <EmptyState
        icon={FaHeart}
        title="Your Wishlist is Empty"
        message="Save items you like to find them easily later."
        actionText="Go to Shop"
        actionLink="/shop"
      />
    );
  }
  return (
    <div className="wishlist-page container">
      <Heading level={1} align="center">My Wishlist</Heading>
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
