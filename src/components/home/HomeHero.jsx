import React from "react";
import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import Button from "../common/Button";

const HomeHero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <Heading level={1}>
            Elevate Your Lifestyle With <span>Premium</span> Picks
          </Heading>
          <p>
            Discover the latest trends in electronics, fashion, and more.
            Quality guaranteed at unbeatable prices.
          </p>
          <div className="hero-btns">
            <Button as={Link} to="/shop" size="xl">
              Shop Now
            </Button>
            <Button as={Link} to="/categories" variant="outline" size="xl">
              View Categories
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero_premium.png" alt="Premium Gadgets" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
