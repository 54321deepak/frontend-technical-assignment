import { FaTimes } from 'react-icons/fa';
import Button from "../common/Button";
import Heading from "../common/Heading";
import InputField from "../common/InputField";
import { FilterSkeleton } from "../common/ProjectSkeletons";

const ShopSidebar = ({
  showMobileFilters,
  setShowMobileFilters,
  category,
  categories,
  categoriesLoading,
  handleParamChange,
  priceRange,
  setPriceRange,
  setSearchParams
}) => {
  return (
    <aside className={`shop-sidebar ${showMobileFilters ? "active" : ""}`}>
      <div className="sidebar-header">
        <Heading level={3}>Filters</Heading>
        <button
          className="close-filters"
          onClick={() => setShowMobileFilters(false)}
        >
          <FaTimes />
        </button>
      </div>
      <div className="filter-group">
        <Heading level={4}>Categories</Heading>
        <ul className="category-list">
          <li
            className={category === "all" ? "active" : ""}
            onClick={() => handleParamChange("category", "all")}
          >
            All Categories
          </li>
          {categoriesLoading ? (
                    Array(5).fill(0).map((_, i) => <FilterSkeleton key={i} />)       ) : (
            categories.map((cat, idx) => {
              const catSlug = typeof cat === "string" ? cat : cat.slug;
              const catName = typeof cat === "string" ? cat : cat.name;
              return (
                <li
                  key={idx}
                  className={category === catSlug ? "active" : ""}
                  onClick={() => handleParamChange("category", catSlug)}
                >
                  {catName}
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="filter-group">
        <Heading level={4}>Price Range</Heading>
        <div className="price-inputs">
          <InputField
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => {
              const val = e.target.value === "" ? 0 : Number(e.target.value);
              setPriceRange((prev) => ({ ...prev, min: val }));
            }}
            style={{ textAlign: "center" }}
          />
          <span>-</span>
          <InputField
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => {
              const val = e.target.value === "" ? 2000 : Number(e.target.value);
              setPriceRange((prev) => ({ ...prev, max: val }));
            }}
            style={{ textAlign: "center" }}
          />
        </div>
        <InputField
          type="range"
          min="0"
          max="2000"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
          }
        />
      </div>
      <Button
        fullWidth
        onClick={() => {
          setSearchParams({});
          setPriceRange({ min: 0, max: 2000 });
          setShowMobileFilters(false);
        }}
      >
        Clear All Filters
      </Button>
    </aside>
  );
};

export default ShopSidebar;
