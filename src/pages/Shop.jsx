import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchProductsRequest,
  fetchCategoriesRequest,
} from "../redux/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import SkeletonCard from "../components/product/SkeletonCard";
import ShopSidebar from "../components/shop/ShopSidebar";
import {
  FaFilter,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import EmptyState from "../components/common/EmptyState";
import "../styles/Shop.css";
const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, productsLoading, categoriesLoading, total } =
    useSelector((state) => state.products);
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const minPrice = searchParams.get("minPrice") !== null
    ? Number(searchParams.get("minPrice"))
    : 0;
  const maxPrice = searchParams.get("maxPrice") !== null
    ? Number(searchParams.get("maxPrice"))
    : 2000;
  const sortBy = searchParams.get("sortBy") || "default";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 12;
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (priceRange.min !== minPrice) handleParamChange("minPrice", priceRange.min.toString());
      if (priceRange.max !== maxPrice) handleParamChange("maxPrice", priceRange.max.toString());
    }, 500);
    return () => clearTimeout(timer);
  }, [priceRange, minPrice, maxPrice]);
  const sortOptions = [
    { value: "default", label: "Sort by" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
  ];
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);
  useEffect(() => {
    const skip = (page - 1) * limit;
    dispatch(
      fetchProductsRequest({
        limit,
        skip,
        category: category !== "all" ? category : null,
        query: query || null,
      }),
    );
  }, [dispatch, category, query, page]);
  const filteredProducts = useMemo(() => {
    let result = [...products];
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [products, minPrice, maxPrice, sortBy]);
  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== "" && value !== null && value !== undefined && value !== "all" && value !== "default") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") newParams.set("page", "1");
    setSearchParams(newParams);
  };
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="shop-page container">
      <div className="shop-header">
        <div className="shop-info">
          <Heading level={1} className="shop-title">
            {category !== "all" ? category.replace("-", " ") : "All Products"}

          </Heading>
          <p>
            Showing {filteredProducts.length} of {total} products
          </p>
        </div>
        <div className="shop-controls">
          <form
            className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleParamChange("q", searchTerm);
            }}
          >
            <button type="submit" className="search-btn">
              <FaSearch className="search-icon-muted" />
            </button>
            <InputField
              variant="plain"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              className="search-input"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleParamChange("q", e.target.value);
              }}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => {
                  setSearchTerm("");
                  handleParamChange("q", "");
                }}
              >
                <FaTimes />
              </button>
            )}
          </form>
          <Button
            variant="outline"
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter /> Filters
          </Button>
          <div
            className="custom-sort-dropdown"
            tabIndex={0}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setIsSortOpen(false);
            }}
          >
            <div
              className="sort-selected"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <FaSortAmountDown />
              <span>
                {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                  "Sort by"}
              </span>
              <span className="sort-arrow">▼</span>
            </div>
            {isSortOpen && (
              <ul className="sort-options">
                {sortOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className={sortBy === opt.value ? "active" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleParamChange("sortBy", opt.value);
                      setIsSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="shop-layout">
        {showMobileFilters && (
          <div className="overlay" onClick={() => setShowMobileFilters(false)}></div>
        )}
        <ShopSidebar
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          category={category}
          categories={categories}
          categoriesLoading={categoriesLoading}
          handleParamChange={handleParamChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setSearchParams={setSearchParams}
        />
        <div className="shop-content">
          <div className="products-grid grid">
            {productsLoading ? (
              Array(8)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : null}
          </div>
          {!productsLoading && filteredProducts.length === 0 && (
            <EmptyState
              icon={FaSearch}
              title="No Products Found"
              message="We couldn't find any products matching your search or filters."
              actionText="Reset All Filters"
              onAction={() => {
                setSearchParams({});
                setPriceRange({ min: 0, max: 2000 });
              }}
            />
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => handleParamChange("page", page - 1)}
                className="pag-btn"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .map((p) => (
                  <button
                    key={p}
                    className={`pag-btn ${page === p ? "active" : ""}`}
                    onClick={() => handleParamChange("page", p)}
                  >
                    {p}
                  </button>
                ))
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}
              <button
                disabled={page === totalPages}
                onClick={() => handleParamChange("page", page + 1)}
                className="pag-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
      {showMobileFilters && (
        <div
          className="overlay"
          onClick={() => setShowMobileFilters(false)}
        ></div>
      )}
    </div>
  );
};
export default Shop;
