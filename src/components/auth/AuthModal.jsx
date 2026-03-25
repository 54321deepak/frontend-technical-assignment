import Heading from "../common/Heading";
import Button from "../common/Button";
import InputField from "../common/InputField";
import { authModalInitialValues, getAuthModalSchema } from "../../utils/validationSchemas";
import authImage from "../../assets/auth/auth_lifestyle.png";
import toast from "react-hot-toast";
import "../../styles/Auth.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { login, signup } from "../../redux/slices/authSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const { registeredUsers } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: authModalInitialValues,
    validationSchema: getAuthModalSchema(mode),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (mode === "login") {
        // Mock login check
        const foundUser = registeredUsers.find(
          (u) => u.email === values.email && u.password === values.password
        );

        if (foundUser) {
          dispatch(login(foundUser));
          toast.success(`Welcome back, ${foundUser.username}!`);
          onClose();
        } else {
          toast.error("Invalid email or password. Please try again or sign up.");
        }
      } else {
        // Mock signup duplicate check
        const exists = registeredUsers.some((u) => u.email === values.email);
        
        if (exists) {
          toast.error("An account with this email already exists. Try logging in.");
        } else {
          const newUser = {
            email: values.email,
            username: values.username || values.email.split("@")[0],
            password: values.password, // Storing password for mock login
          };
          dispatch(signup(newUser));
          toast.success("Account created successfully!");
          onClose();
        }
      }
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

  const passwordToggle = (
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );

  const confirmPasswordToggle = (
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal-container split-view">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>
        <div className="auth-modal-image">
          <img src={authImage} alt="Login Lifestyle" />
          <div className="image-overlay">
            <Heading level={3}>Elevate Your Style</Heading>
            <p>Curated collections for the modern shopper.</p>
          </div>
        </div>
        <div className="auth-modal-content">
          <div className="auth-modal-header">
            <Heading level={2}>{mode === "login" ? "Welcome Back" : "Create Account"}</Heading>
            <p>
              {mode === "login"
                ? "Login to your account to continue"
                : "Join us for a premium shopping experience"}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="auth-modal-form">
            {mode === "signup" && (
              <div className="form-row">
                <InputField
                  label="Username"
                  icon={FaUser}
                  type="text"
                  placeholder="Enter username"
                  error={formik.errors.username}
                  touched={formik.touched.username}
                  {...formik.getFieldProps("username")}
                />
                <InputField
                  label="Email Address"
                  icon={FaEnvelope}
                  type="email"
                  placeholder="Enter email"
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  {...formik.getFieldProps("email")}
                />
              </div>
            )}

            {mode === "login" && (
              <InputField
                label="Email Address"
                icon={FaEnvelope}
                type="email"
                placeholder="Enter email"
                error={formik.errors.email}
                touched={formik.touched.email}
                {...formik.getFieldProps("email")}
              />
            )}

            <div className={mode === "signup" ? "form-row" : ""}>
              <InputField
                label="Password"
                icon={FaLock}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                error={formik.errors.password}
                touched={formik.touched.password}
                {...formik.getFieldProps("password")}
              >
                {passwordToggle}
              </InputField>

              {mode === "signup" && (
                <InputField
                  label="Confirm Password"
                  icon={FaLock}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  error={formik.errors.confirmPassword}
                  touched={formik.touched.confirmPassword}
                  {...formik.getFieldProps("confirmPassword")}
                >
                  {confirmPasswordToggle}
                </InputField>
              )}
            </div>

            <Button type="submit" fullWidth size="xl" className="signup-submit-btn">
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="auth-modal-footer">
            <p>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <span onClick={toggleMode}>{mode === "login" ? "Sign Up" : "Login"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
