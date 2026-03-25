import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { signupInitialValues, signupValidationSchema } from "../../utils/validationSchemas";
import { signup } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import "../../styles/Auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      dispatch(signup({ email: values.email, username: values.username }));
      toast.success("Account created successfully!");
      navigate("/");
    },
  });
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Heading level={2}>Create Account</Heading>
        <p>Join us for the best shopping experience</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <InputField
              label="Username"
              type="text"
              placeholder="Enter username"
              error={formik.errors.username}
              touched={formik.touched.username}
              {...formik.getFieldProps("username")}
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              error={formik.errors.email}
              touched={formik.touched.email}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="form-row">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={formik.errors.password}
              touched={formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
          <Button type="submit" fullWidth className="signup-submit-btn">
            Sign Up
          </Button>
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
