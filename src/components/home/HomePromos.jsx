import React from "react";
import { FaShippingFast, FaUndo, FaLock, FaGlobe } from "react-icons/fa";
import PromoCard from "../common/PromoCard";

const HomePromos = () => {
  return (
    <section className="promo-section container">
      <div className="promo-grid">
        <PromoCard
          icon={FaShippingFast}
          title="Free Shipping"
          description="On all orders over $100"
        />
        <PromoCard
          icon={FaUndo}
          title="Easy Returns"
          description="30-day money back guarantee"
        />
        <PromoCard
          icon={FaLock}
          title="Secure Payments"
          description="100% protected transactions"
        />
        <PromoCard
          icon={FaGlobe}
          title="24/7 Support"
          description="Dedicated customer service"
        />
      </div>
    </section>
  );
};

export default HomePromos;
