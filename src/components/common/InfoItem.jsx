import React from "react";
import Heading from "./Heading";

const InfoItem = ({ icon: Icon, title, description, iconSize = 22 }) => {
  return (
    <div className="info-item">
      <div className="contact-icon-wrapper">
        {Icon && <Icon size={iconSize} />}
      </div>
      <div>
        <Heading level={4}>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoItem;
