import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  fetchCategoriesRequest,
} from "../redux/slices/productSlice";
import HomeHero from "../components/home/HomeHero";
import HomePromos from "../components/home/HomePromos";
import HomeCategories from "../components/home/HomeCategories";
import HomeFeatured from "../components/home/HomeFeatured";
import "../styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductsRequest({ limit: 8 }));
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      <HomeHero />
      <HomePromos />
      <HomeCategories categories={categories} />
      <HomeFeatured loading={loading} featuredProducts={featuredProducts} />
    </div>
  );
};

export default Home;
