import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes from "./components/layout/AppRoutes";
import AppToaster from "./components/common/AppToaster";
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
        <AppToaster />
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
