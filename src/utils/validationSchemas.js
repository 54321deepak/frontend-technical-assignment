import * as Yup from "yup";

// --- Login Form Configuration ---
export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// --- Signup Form Configuration ---
export const signupInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const signupValidationSchema = Yup.object({
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

// --- AuthModal Combined Configuration ---
export const authModalInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const getAuthModalSchema = (mode) => {
  return Yup.object({
    username: mode === "signup" 
      ? Yup.string().min(3, "Username must be at least 3 characters").required("Username is required")
      : Yup.string(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: mode === "signup"
      ? Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required")
      : Yup.string(),
  });
};
