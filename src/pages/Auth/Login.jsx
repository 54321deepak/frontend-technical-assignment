import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginInitialValues, loginValidationSchema } from "../../utils/validationSchemas";
import { login } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import "../../styles/Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(
        login({
          email: values.email,
          username: values.email.split("@")[0],
        }),
      );
      toast.success("Login successful");
      navigate("/");
    },
  });
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Heading level={2}>Welcome Back</Heading>
        <p>Login to your account to continue shopping</p>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={formik.errors.email}
            touched={formik.touched.email}
            {...formik.getFieldProps("email")}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={formik.errors.password}
            touched={formik.touched.password}
            {...formik.getFieldProps("password")}
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
