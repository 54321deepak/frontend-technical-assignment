import React from "react";

const SummaryRow = ({ label, value, isTotal = false }) => {
  return (
    <div className={`summary-row ${isTotal ? "total" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default SummaryRow;
