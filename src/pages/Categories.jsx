import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesRequest } from "../redux/slices/productSlice";
import { getCategoryImage } from "../utils/categoryImages";
import "../styles/Home.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);
  return (
    <div
      className="categories-page container"
      style={{ padding: "2rem 1rem 6rem" }}
    >
      <h1 className="page-title">Explore All Categories</h1>
      <div className="categories-grid">
        {loading
          ? [...Array(10)].map((_, idx) => (
              <div key={idx} className="category-card skeleton">
                <div
                  className="skeleton-block"
                  style={{ width: 90, height: 90, borderRadius: "50%" }}
                ></div>
                <div
                  className="skeleton-block"
                  style={{ width: "80%", height: 20, borderRadius: 4 }}
                ></div>
              </div>
            ))
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
                  <h3>{name}</h3>
                </Link>
              );
            })}
      </div>
    </div>
  );
};
export default Categories;
