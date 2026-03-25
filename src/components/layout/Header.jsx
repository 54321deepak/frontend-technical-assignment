import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { toggleDarkMode } from "../../redux/slices/themeSlice";
import { logout } from "../../redux/slices/authSlice";
import AuthModal from "../auth/AuthModal";
import toast from "react-hot-toast";
import Button from "../common/Button";
import "../../styles/Header.css";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenuRef = useRef(null);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setIsUserMenuOpen(false);
    navigate("/");
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/favicon.svg" alt="ShopNow Logo" className="logo-img" />
          <span className="logo-text"><span>Shop</span>Now</span>
        </Link>
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={() => setIsMenuOpen(false)}>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button
            className="action-btn-circle"
            onClick={() => { dispatch(toggleDarkMode()); setIsMenuOpen(false); }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/wishlist" className="action-btn-circle" onClick={() => setIsMenuOpen(false)}>
            <FaHeart />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className="action-btn-circle" onClick={() => setIsMenuOpen(false)}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          {isAuthenticated ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button className="user-profile-btn" onClick={() => { toggleUserMenu(); setIsMenuOpen(false); }}>
                <FaUser />
                <span className="user-name">{user?.username || "Profile"}</span>
              </button>
              {isUserMenuOpen && (
                <ul className="user-dropdown">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="logout-btn"
                      style={{
                        borderTop: "none",
                        marginTop: 0,
                        paddingTop: "0.75rem",
                      }}
                    >
                      <FaTimes /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Button
              onClick={() => openAuthModal("login")}
              className="login-btn-header"
            >
              <span className="login-text">Login</span>
              <FaUser className="login-icon" />
            </Button>
          )}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-main)",
              cursor: "pointer",
            }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};
export default Header;
