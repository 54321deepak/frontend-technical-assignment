import React from "react";
import "../../styles/SkeletonCard.css";
const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-line category"></div>
        <div className="skeleton-line title"></div>
        <div className="skeleton-flex">
          <div className="skeleton-line price"></div>
          <div className="skeleton-line rating"></div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonCard;
