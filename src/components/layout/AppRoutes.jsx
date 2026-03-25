import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../../pages/Home";
import Shop from "../../pages/Shop";
import ProductDetails from "../../pages/ProductDetails";
import Categories from "../../pages/Categories";
import Contact from "../../pages/Contact";
import Cart from "../../pages/Cart";
import Wishlist from "../../pages/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
