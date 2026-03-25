import React from "react";
import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import Button from "../common/Button";
import ProductCard from "../product/ProductCard";
import SkeletonCard from "../product/SkeletonCard";

const HomeFeatured = ({ loading, featuredProducts }) => {
  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <div className="header-titles">
            <span className="section-subtitle">Our Collection</span>
            <Heading level={2}>Featured Products</Heading>
          </div>
          <Button as={Link} to="/shop" variant="outline">
            Explore All
          </Button>
        </div>
        <div className="products-grid grid">
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
  );
};

export default HomeFeatured;
