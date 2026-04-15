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
import Button from "../components/common/Button";
import PromoCard from "../components/common/PromoCard";
import QuantitySelector from "../components/common/QuantitySelector";
import { ProductDetailsSkeleton } from "../components/common/ProjectSkeletons";
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
import Heading from "../components/common/Heading";
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
    if (loading) return <ProductDetailsSkeleton />;
    if (error) return <div className="container error-msg">{error}</div>;
    if (!product) return null;
    return (
        <div className="product-details-page container">
            <Button
                variant="ghost"
                className="back-link"
                onClick={() => navigate(-1)}
            >
                <FaChevronLeft /> Back to Shop
            </Button>
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
                    <Heading level={1}>{product.title}</Heading>
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
                            <QuantitySelector
                                quantity={cartItem.quantity}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                className="full-width"
                                size="xl"
                            />
                        ) : (
                            <Button
                                size="xl"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                style={{ flex: 1 }}
                            >
                                <FaShoppingCart /> Add to Cart
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="xl"
                            className={isInWishlist ? "active" : ""}
                            onClick={handleToggleWishlist}
                            style={{
                                borderColor: isInWishlist ? "var(--error)" : "",
                                color: isInWishlist ? "var(--error)" : "",
                            }}
                        >
                            <FaHeart /> {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
                        </Button>
                    </div>
                    <div className="product-meta">
                        <PromoCard
                            icon={FaShippingFast}
                            title="Fast Delivery"
                            description="2-4 business days"
                            className="meta-item"
                            titleLevel={5}
                        />
                        <PromoCard
                            icon={FaShieldAlt}
                            title="Secure Warranty"
                            description="1 year brand warranty"
                            className="meta-item"
                            titleLevel={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
