import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getAllCategoriesService } from "../../services/categories.service";
import { Link } from "react-router-dom";

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
      <div>
        <h1>Categories</h1>
        {categories.map((category) => (
          <Link
            to={`/products?category=${category.categoryName.toLowerCase()}`}
          >
            <div>{category.categoryName}</div>
          </Link>
        ))}
      </div>
    </>
  );
};
