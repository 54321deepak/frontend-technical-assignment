import React from "react";
import Heading from "./Heading";

const PromoCard = ({ icon: Icon, title, description, className = "", titleLevel = 4 }) => {
  return (
    <div className={`promo-card ${className}`}>
      {Icon && <Icon />}
      <div>
        <Heading level={titleLevel}>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PromoCard;
