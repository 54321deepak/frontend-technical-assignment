import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    removeFromCart,
    updateQuantity,
} from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { getProductById } from "../services/api";
import toast from "react-hot-toast";
import SkeletonCard from "../components/product/SkeletonCard";
import {
    FaShoppingCart,
    FaHeart,
    FaChevronLeft,
    FaStar,
    FaShippingFast,
    FaShieldAlt,
    FaPlus,
    FaMinus,
    FaTrash,
} from "react-icons/fa";
import "../styles/ProductDetails.css";
const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlistItems.some((item) => item.id === Number(id));
    const cartItems = useSelector((state) => state.cart.items);
    const cartItem = cartItems.find((item) => item.id === Number(id));
    const isInCart = !!cartItem;
    const handleAddToCart = () => {
        if (isInCart) {
            dispatch(removeFromCart(product.id));
            toast.error("Removed from Cart");
        } else {
            dispatch(addToCart(product));
            toast.success("Added to Cart");
        }
    };
    const handleIncrease = () => {
        dispatch(
            updateQuantity({ id: product.id, quantity: cartItem.quantity + 1 }),
        );
    };
    const handleDecrease = () => {
        if (cartItem.quantity > 1) {
            dispatch(
                updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 }),
            );
        } else {
            dispatch(removeFromCart(product.id));
            toast.error("Removed from Cart");
        }
    };
    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(product));
        if (isInWishlist) {
            toast.error("Removed from Wishlist");
        } else {
            toast.success("Added to Wishlist");
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
                setMainImage(data.images[0]);
            } catch (err) {
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    if (loading)
        return (
            <div className="product-details-page container">
                <div
                    className="skeleton-block"
                    style={{
                        width: 120,
                        height: 20,
                        marginBottom: "2.5rem",
                        borderRadius: 8,
                    }}
                ></div>
                <div className="product-details-skeleton-layout">
                    <div>
                        <div
                            className="skeleton-block"
                            style={{
                                width: "100%",
                                aspectRatio: "1/1",
                                borderRadius: 20,
                                marginBottom: "1.25rem",
                            }}
                        ></div>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="skeleton-block"
                                    style={{ width: 80, height: 80, borderRadius: 10 }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                    >
                        <div
                            className="skeleton-block"
                            style={{ width: 100, height: 28, borderRadius: 20 }}
                        ></div>
                        <div
                            className="skeleton-block"
                            style={{ width: "80%", height: 40, borderRadius: 8 }}
                        ></div>
                        <div
                            className="skeleton-block"
                            style={{ width: "50%", height: 28, borderRadius: 8 }}
                        ></div>
                        <div
                            className="skeleton-block"
                            style={{ width: "100%", height: 80, borderRadius: 12 }}
                        ></div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <div
                                className="skeleton-block"
                                style={{ width: "100%", height: 16, borderRadius: 6 }}
                            ></div>
                            <div
                                className="skeleton-block"
                                style={{ width: "90%", height: 16, borderRadius: 6 }}
                            ></div>
                            <div
                                className="skeleton-block"
                                style={{ width: "75%", height: 16, borderRadius: 6 }}
                            ></div>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div
                                className="skeleton-block"
                                style={{ flex: 1, height: 54, borderRadius: 10 }}
                            ></div>
                            <div
                                className="skeleton-block"
                                style={{ flex: 1, height: 54, borderRadius: 10 }}
                            ></div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1rem",
                            }}
                        >
                            <div
                                className="skeleton-block"
                                style={{ height: 70, borderRadius: 10 }}
                            ></div>
                            <div
                                className="skeleton-block"
                                style={{ height: 70, borderRadius: 10 }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    if (error) return <div className="container error-msg">{error}</div>;
    if (!product) return null;
    return (
        <div className="product-details-page container">
            <button
                className="back-link"
                onClick={() => navigate(-1)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    font: "inherit",
                    color: "inherit",
                }}
            >
                <FaChevronLeft /> Back to Shop
            </button>
            <div className="product-details-layout">
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={mainImage} alt={product.title} />
                    </div>
                    <div className="thumbnail-list">
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`${product.title} ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-info-details">
                    <span className="category-tag">{product.category}</span>
                    <h1>{product.title}</h1>
                    <div className="rating-row">
                        <div className="stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <FaStar
                                    key={i}
                                    color={i < Math.round(product.rating) ? "#fbbf24" : "#e2e8f0"}
                                />
                            ))}
                        </div>
                        <span>({product.rating} Rating)</span>
                    </div>
                    <div className="price-row">
                        <span className="price">${product.price}</span>
                        {product.discountPercentage > 0 && (
                            <span className="discount-badge">
                                {product.discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                    <p className="description">{product.description}</p>
                    {/* <div className="stock-info">
            <span
              className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
            >
              {product.stock > 0
                ? `✓ In Stock (${product.stock} units)`
                : "✗ Out of Stock"}
            </span>
          </div> */}
                    <div className="action-buttons">
                        {isInCart ? (
                            <div className="cart-management">
                                <div className="detail-quantity-selector" style={{ flex: 1 }}>
                                    <button onClick={handleDecrease} title="Decrease quantity">
                                        <FaMinus />
                                    </button>
                                    <span style={{ flex: 1 }}>{cartItem.quantity}</span>
                                    <button onClick={handleIncrease} title="Increase quantity">
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="btn btn-primary btn-xl"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                style={{ flex: 1 }}
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        )}
                        <button
                            className={`btn btn-outline btn-xl ${isInWishlist ? "active" : ""}`}
                            onClick={handleToggleWishlist}
                            style={{
                                borderColor: isInWishlist ? "var(--error)" : "",
                                color: isInWishlist ? "var(--error)" : "",
                            }}
                        >
                            <FaHeart /> {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
                        </button>
                    </div>
                    <div className="product-meta">
                        <div className="meta-item">
                            <FaShippingFast />
                            <div>
                                <h5>Fast Delivery</h5>
                                <p>2-4 business days</p>
                            </div>
                        </div>
                        <div className="meta-item">
                            <FaShieldAlt />
                            <div>
                                <h5>Secure Warranty</h5>
                                <p>1 year brand warranty</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
