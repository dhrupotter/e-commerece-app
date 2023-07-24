import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getAllCategoriesService } from "../../services/categories.service";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./home.css";

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategoriesService();
      console.log(data);
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="categories-section">
        <h1>Discover one-of-a-kind items</h1>
        <div className="categories-list">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.categoryName.toLowerCase()}`}
            >
              <div className="categories">
                <img src={category.img}></img>
                <div className="opacity-layer"></div>
                <p>{category.categoryName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
