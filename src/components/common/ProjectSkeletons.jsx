import React from "react";
import Skeleton from "./Skeleton";

export const CategorySkeleton = () => (
  <div className="category-card skeleton">
    <Skeleton width={90} height={90} circle />
    <Skeleton width="80%" height={20} />
  </div>
);

export const FilterSkeleton = () => (
  <li className="filter-skeleton">
    <Skeleton width={20} height={20} />
    <Skeleton width="60%" height={16} />
  </li>
);

export const ProductDetailsSkeleton = () => (
  <div className="product-details-page container">
    <Skeleton
      width={120}
      height={20}
      borderRadius={8}
      style={{ marginBottom: "2.5rem" }}
    />
    <div className="product-details-skeleton-layout">
      <div>
        <Skeleton
          width="100%"
          borderRadius={20}
          style={{ aspectRatio: "1/1", marginBottom: "1.25rem" }}
        />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={80} height={80} borderRadius={10} />
          ))}
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <Skeleton width={100} height={28} borderRadius={20} />
        <Skeleton width="80%" height={40} borderRadius={8} />
        <Skeleton width="50%" height={28} borderRadius={8} />
        <Skeleton width="100%" height={80} borderRadius={12} />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton width="100%" height={16} borderRadius={6} />
          <Skeleton width="90%" height={16} borderRadius={6} />
          <Skeleton width="75%" height={16} borderRadius={6} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Skeleton height={54} borderRadius={10} style={{ flex: 1 }} />
          <Skeleton height={54} borderRadius={10} style={{ flex: 1 }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Skeleton height={70} borderRadius={10} />
          <Skeleton height={70} borderRadius={10} />
        </div>
      </div>
    </div>
  </div>
);
