import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Heading from "../common/Heading";
import "../../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section about">
          <Link to="/" className="logo">
            <span>Shop</span>Now
          </Link>
          <p>
            Your ultimate destination for curated products and seamless
            shopping. Modern experiences for modern shoppers.
          </p>
          <div className="social-links">
            <span className="social-icon-btn">
              <FaFacebook />
            </span>
            <span className="social-icon-btn">
              <FaTwitter />
            </span>
            <span className="social-icon-btn">
              <FaInstagram />
            </span>
            <span className="social-icon-btn">
              <FaLinkedin />
            </span>
          </div>
        </div>
        <div className="footer-section links">
          <Heading level={3}>Quick Links</Heading>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section links">
          <Heading level={3}>Customer Service</Heading>
          <ul>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="#">Returns & Refunds</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <Heading level={3}>Contact Us</Heading>
          <div className="contact-info">
            <p>
              <FaEnvelope className="contact-icon" /> support@e-shop.com
            </p>
            <p>
              <FaPhoneAlt className="contact-icon" /> +1 (234) 567-890
            </p>
            <p>
              <FaMapMarkerAlt className="contact-icon" /> 123 Commerce St, Tech
              City
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-SHOP. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
