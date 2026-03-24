import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, signup } from "../../redux/slices/authSlice";
import authImage from "../../assets/auth/auth_lifestyle.png";
import toast from "react-hot-toast";
import "../../styles/Auth.css";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
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

  const validationSchema = Yup.object({
    username: mode === "signup" 
      ? Yup.string().min(3, "Username must be at least 3 characters").required("Username is required")
      : Yup.string(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: mode === "signup"
      ? Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required")
      : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (mode === "login") {
        const username = values.email.split("@")[0];
        dispatch(login({ email: values.email, username }));
        toast.success("Login successful");
      } else {
        dispatch(signup({ email: values.email, username: values.username }));
        toast.success("Account created successfully!");
      }
      onClose();
    },
  });

  useEffect(() => {
    setMode(initialMode);
    formik.resetForm();
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    formik.resetForm();
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
          <form onSubmit={formik.handleSubmit} className="auth-modal-form">
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
                      {...formik.getFieldProps("username")}
                      className={formik.touched.username && formik.errors.username ? "error" : ""}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <span className="error-text">{formik.errors.username}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      {...formik.getFieldProps("email")}
                      className={formik.touched.email && formik.errors.email ? "error" : ""}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span className="error-text">{formik.errors.email}</span>
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
                        {...formik.getFieldProps("password")}
                        className={formik.touched.password && formik.errors.password ? "error" : ""}
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
                    {formik.touched.password && formik.errors.password && (
                      <span className="error-text">{formik.errors.password}</span>
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
                        {...formik.getFieldProps("confirmPassword")}
                        className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}
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
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <span className="error-text">
                        {formik.errors.confirmPassword}
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
                    {...formik.getFieldProps("email")}
                    className={formik.touched.email && formik.errors.email ? "error" : ""}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="error-text">{formik.errors.email}</span>
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
                      {...formik.getFieldProps("password")}
                      className={formik.touched.password && formik.errors.password ? "error" : ""}
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
                  {formik.touched.password && formik.errors.password && (
                    <span className="error-text">{formik.errors.password}</span>
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
