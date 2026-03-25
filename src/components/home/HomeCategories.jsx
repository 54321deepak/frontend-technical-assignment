import React from "react";
import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import Button from "../common/Button";
import { getCategoryImage } from "../../utils/categoryImages";

const HomeCategories = ({ categories }) => {
  return (
    <section className="categories-section container">
      <div className="section-header">
        <Heading level={2}>Browse By Category</Heading>
        <Button as={Link} to="/categories" variant="outline">
          View All
        </Button>
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
            <Heading level={3}>{category.name || category}</Heading>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
