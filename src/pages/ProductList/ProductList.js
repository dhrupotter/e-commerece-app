import { useEffect, useState } from "react";
import axios from "axios";

import "./ProductList.css";

export const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [inStockToggle, setInStockToggle] = useState(false);
  const [cupsToggle, setCupsToggle] = useState(false);
  const [platesToggle, setPlatesToggle] = useState(false);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInStockToggle = (e) => {
    setInStockToggle(e.target.checked);
    // console.log(inStockToggle);
  };

  const handleCupsToggle = (e) => {
    setCupsToggle(e.target.value);
  };

  const handlePlatesToggle = (e) => {
    setPlatesToggle(e.target.value);
  };

  const getInStockProducts = (products, inStockToggle) => {
    if (inStockToggle) {
      return products.filter((product) => product.inStock);
    }
    return products;
  };

  const getFilteredCategoryProducts = (products, cupsToggle) => {
    switch (category) {
      case cupsToggle:
        return products.filter(
          (product) => product.category.toLowerCase() === "cups"
        );
        break;

      case platesToggle:
        return products.filter(
          (product) => product.category.toLowerCase() === "plates"
        );
        break;

      default:
        break;
    }
  };

  const filteredProducts = () => {};

  useEffect(() => {
    getAllProducts();
  }, []);
  // console.log(allProducts);

  return (
    <div>
      <div className="sidebar-section">
        <input
          type="checkbox"
          onChange={handleInStockToggle}
          value={inStockToggle}
        />
        In Stock only
        <ul>
          <h3>Categories</h3>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={handleCupsToggle}
              value={abstractToggle}
            />
            Cups
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={handlePortraitToggle}
              value={portraitToggle}
            />
            Plates
          </li>
        </ul>
      </div>
      <section className="product-list-section">
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-card">
              <li key={product.id}>
                <img
                  src={product.img}
                  atl={product.name}
                  className="product-img"
                ></img>
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}$</p>
              </li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};
