import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { login, signup } from "../../redux/slices/authSlice";
import authImage from "../../assets/auth/auth_lifestyle.png";
import toast from "react-hot-toast";
import "../../styles/Auth.css";
const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  useEffect(() => {
    setMode(initialMode);
    setErrors({});
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  }, [initialMode, isOpen]);
  if (!isOpen) return null;
  const validate = () => {
    const newErrors = {};
    if (mode === "signup" && !formData.username)
      newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (mode === "login") {
        const username = formData.email.split("@")[0];
        dispatch(login({ email: formData.email, username }));
        toast.success(`Welcome back, ${username}!`);
      } else {
        dispatch(
          signup({ email: formData.email, username: formData.username }),
        );
        toast.success(`Account created! Welcome, ${formData.username}!`);
      }
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };
  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
  };
  const handleOverlayClick = (e) => {
    if (e.target.className === "auth-modal-overlay") {
      onClose();
    }
  };
  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal-container split-view">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="auth-modal-image">
          <img src={authImage} alt="Login Lifestyle" />
          <div className="image-overlay">
            <h3>Elevate Your Style</h3>
            <p>Curated collections for the modern shopper.</p>
          </div>
        </div>
        <div className="auth-modal-content">
          <div className="auth-modal-header">
            <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
            <p>
              {mode === "login"
                ? "Login to your account to continue"
                : "Join us for a premium shopping experience"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="auth-modal-form">
            {mode === "signup" ? (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaUser /> Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className={errors.username ? "error" : ""}
                    />
                    {errors.username && (
                      <span className="error-text">{errors.username}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaLock /> Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className={errors.password ? "error" : ""}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          display: "flex"
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="error-text">{errors.password}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <FaLock /> Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={errors.confirmPassword ? "error" : ""}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          display: "flex"
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-text">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>
                    <FaEnvelope /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    <FaLock /> Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={errors.password ? "error" : ""}
                      style={{ paddingRight: "2.5rem" }}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        display: "flex"
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>
              </>
            )}
            <button
              type="submit"
              className="btn btn-primary full-width"
              style={{ marginTop: "1rem" }}
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="auth-modal-footer">
            {mode === "login" ? (
              <p>
                Don't have an account? <span onClick={toggleMode}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={toggleMode}>Login</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
