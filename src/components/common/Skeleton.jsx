import React from "react";

const Skeleton = ({
  width,
  height,
  borderRadius = 4,
  circle = false,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`skeleton-block ${className}`}
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: circle ? "50%" : borderRadius,
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
