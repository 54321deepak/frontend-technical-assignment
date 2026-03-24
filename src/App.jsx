import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/layout/ScrollToTop";
function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 800,
            style: {
              background: isDarkMode ? "#1e293b" : "#ffffff",
              color: isDarkMode ? "#f8fafc" : "#0f172a",
              border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
              borderRadius: "12px",
              padding: "14px 20px",
              fontWeight: "600",
              fontSize: "0.95rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Header />
        <main
          className="main-content"
          style={{ minHeight: "calc(100vh - var(--header-h) - 300px)" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
