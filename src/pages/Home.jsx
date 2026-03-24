import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShippingFast, FaUndo, FaLock, FaGlobe } from "react-icons/fa";
import {
  fetchProductsRequest,
  fetchCategoriesRequest,
} from "../redux/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import SkeletonCard from "../components/product/SkeletonCard";
import { getCategoryImage } from "../utils/categoryImages";
import "../styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector(
    (state) => state.products,
  );
  useEffect(() => {
    dispatch(fetchProductsRequest({ limit: 8 }));
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);
  const featuredProducts = products.slice(0, 8);
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Elevate Your Lifestyle With <span>Premium</span> Picks
            </h1>
            <p>
              Discover the latest trends in electronics, fashion, and more.
              Quality guaranteed at unbeatable prices.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
              <Link to="/categories" className="btn btn-outline btn-lg">
                View Categories
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero_premium.png" alt="Premium Gadgets" />
          </div>
        </div>
      </section>
      <section className="promo-section container">
        <div className="promo-grid">
          <div className="promo-card">
            <FaShippingFast />
            <div>
              <h4>Free Shipping</h4>
              <p>On all orders over $100</p>
            </div>
          </div>
          <div className="promo-card">
            <FaUndo />
            <div>
              <h4>Easy Returns</h4>
              <p>30-day money back guarantee</p>
            </div>
          </div>
          <div className="promo-card">
            <FaLock />
            <div>
              <h4>Secure Payments</h4>
              <p>100% protected transactions</p>
            </div>
          </div>
          <div className="promo-card">
            <FaGlobe />
            <div>
              <h4>24/7 Support</h4>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>
      <section className="categories-section container">
        <div className="section-header">
          <h2>Browse By Category</h2>
          <Link to="/categories" className="btn btn-outline">
            View All
          </Link>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 6).map((category, index) => (
            <Link
              to={`/shop?category=${typeof category === "string" ? category : category.slug}`}
              key={index}
              className="category-card"
            >
              <div className="category-icon">
                <img
                  src={getCategoryImage(category.slug || category)}
                  alt={category.name || category}
                />
              </div>
              <h3>{category.name || category}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="header-titles">
              <span className="section-subtitle">Our Collection</span>
              <h2>Featured Products</h2>
            </div>
            <Link to="/shop" className="btn btn-outline">
              Explore All
            </Link>
          </div>
          <div
            className="products-grid grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
