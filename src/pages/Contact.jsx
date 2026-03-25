import React, { useState } from "react";
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import InfoItem from "../components/common/InfoItem";
import "../styles/Contact.css";
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Your message has been sent successfully!");
  };
  return (
    <div className="contact-page container">
      <div className="contact-header">
        <Heading level={1}>Get In Touch</Heading>
        <p className="description">
          Have questions or feedback? We'd love to hear from you. Fill out the
          form below and our team will get back to you shortly.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-info-list">
          <InfoItem icon={FaPhone} title="Call Us" description="+1 (234) 567-890" />
          <InfoItem icon={FaEnvelope} title="Email Us" description="support@shopnow.com" />
          <InfoItem icon={FaMapMarkerAlt} title="Visit Us" description="123 Commerce St, Tech City, 90210" />
        </div>
        <div className="contact-form-container">
          {submitted ? (
            <div className="success-msg">
              <FaCheckCircle
                size={60}
                color="var(--success)"
                className="success-icon"
              />
              <Heading level={2} className="success-title">
                Message Sent Successfully!
              </Heading>
              <p className="success-desc">
                Thank you for reaching out. A member of our support team will
                contact you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              className="auth-card contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <InputField label="Full Name" type="text" placeholder="John Doe" required />
                <InputField label="Email Address" type="email" placeholder="john@example.com" required />
              </div>
              <InputField label="Subject" type="text" placeholder="How can we help?" required />
              <InputField 
                label="Message" 
                multiline 
                rows="5"
                className="contact-textarea" 
                placeholder="Tell us what's on your mind..." 
                required 
              />
              <Button type="submit" fullWidth className="contact-submit-btn">
                <FaPaperPlane /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contact;
