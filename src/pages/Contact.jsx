import React, { useState } from "react";
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/Contact.css";
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Your message has been sent successfully!");
  };
  return (
    <div
      className="contact-page container"
      style={{ padding: "2rem 1rem 6rem" }}
    >
      <div
        className="contact-header"
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 4rem",
        }}
      >
        <h1 className="page-title">Get In Touch</h1>
        <p
          className="description"
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            marginTop: "1rem",
          }}
        >
          Have questions or feedback? We'd love to hear from you. Fill out the
          form below and our team will get back to you shortly.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-info-list">
          <div className="info-item">
            <div className="contact-icon-wrapper">
              <FaPhone size={22} />
            </div>
            <div>
              <h4>Call Us</h4>
              <p>+1 (234) 567-890</p>
            </div>
          </div>
          <div className="info-item">
            <div className="contact-icon-wrapper">
              <FaEnvelope size={22} />
            </div>
            <div>
              <h4>Email Us</h4>
              <p>support@shopnow.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="contact-icon-wrapper">
              <FaMapMarkerAlt size={22} />
            </div>
            <div>
              <h4>Visit Us</h4>
              <p>123 Commerce St, Tech City, 90210</p>
            </div>
          </div>
        </div>
        <div className="contact-form-container">
          {submitted ? (
            <div
              className="success-msg"
              style={{
                background: "var(--bg-card)",
                padding: "4rem 2rem",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                border: "1px solid var(--success)",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <FaCheckCircle
                size={60}
                color="var(--success)"
                style={{ marginBottom: "1.5rem" }}
              />
              <h2 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>
                Message Sent Successfully!
              </h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                Thank you for reaching out. A member of our support team will
                contact you within 24 hours.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              className="auth-card"
              style={{ maxWidth: "none", margin: 0 }}
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  style={{ minHeight: "160px", padding: "1rem" }}
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary full-width"
                style={{ marginTop: "1rem", height: "54px" }}
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contact;
