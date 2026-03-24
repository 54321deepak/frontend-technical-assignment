import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import "../../styles/Auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signup({ email: values.email, username: values.username }));
      toast.success("Account created successfully!");
      navigate("/");
    },
  });
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join us for the best shopping experience</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
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
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
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
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
                className={formik.touched.password && formik.errors.password ? "error" : ""}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="error-text">{formik.errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...formik.getFieldProps("confirmPassword")}
                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <span className="error-text">{formik.errors.confirmPassword}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary full-width"
            style={{ marginTop: "1rem" }}
          >
            Sign Up
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
