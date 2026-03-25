import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesRequest } from "../redux/slices/productSlice";
import { getCategoryImage } from "../utils/categoryImages";
import Heading from "../components/common/Heading";
import { CategorySkeleton } from "../components/common/ProjectSkeletons";
import "../styles/Home.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);
  return (
    <div className="categories-page container">
      <Heading level={1} align="center">Explore All Categories</Heading>
      <div className="categories-grid">
        {loading
          ? [...Array(10)].map((_, idx) => <CategorySkeleton key={idx} />)
          : categories.map((cat, idx) => {
              const slug = typeof cat === "string" ? cat : cat.slug;
              const name = typeof cat === "string" ? cat : cat.name;
              return (
                <Link
                  to={`/shop?category=${slug}`}
                  key={idx}
                  className="category-card"
                >
                  <div className="category-icon">
                    <img
                      src={getCategoryImage(slug)}
                      alt={name}
                    />
                  </div>
                  <Heading level={3}>{name}</Heading>
                </Link>
              );
            })}
      </div>
    </div>
  );
};
export default Categories;
