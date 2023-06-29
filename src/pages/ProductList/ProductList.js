import { useState } from "react";

import "./ProductList.css";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../contexts/products.context";

export const ProductList = () => {
  const { productId } = useParams();
  const { allProducts } = useProducts();
  const [inStockToggle, setInStockToggle] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInStockToggle = (e) => {
    setInStockToggle(e.target.checked);
  };

  const getInStockProducts = (products, inStockToggle) => {
    if (inStockToggle) {
      return products.filter((product) => product.inStock);
    }
    return products;
  };

  const handleCategoriesChange = (e, category) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((categoryName) => categoryName !== category)
      );
    }
  };

  const getSelectedCategoryProducts = (products, categories) => {
    if (categories.length !== 0) {
      return products.filter((product) =>
        categories.includes(product.category.toLowerCase())
      );
    }
    return products;
  };

  const inStockProducts = getInStockProducts(allProducts, inStockToggle);

  const selectedCategoryProducts = getSelectedCategoryProducts(
    inStockProducts,
    selectedCategories
  );

  const handleAddProductToCart = () => {};

  const handleAddProductToWishlist = () => {};

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
              onChange={(e) => handleCategoriesChange(e, "cups")}
              checked={selectedCategories.includes("cups")}
            />
            Cups
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "plates")}
              checked={selectedCategories.includes("plates")}
            />
            Plates
          </li>
        </ul>
      </div>
      <section className="product-list-section">
        <ul className="product-list">
          {selectedCategoryProducts.map((product) => (
            <div className="product-card">
              <li key={product.id}>
                <Link key={product.id} to={`/products/${product.id}`}>
                  <img
                    src={product.img}
                    atl={product.name}
                    className="product-img"
                  ></img>{" "}
                </Link>
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}$</p>
                <button onClick={handleAddProductToCart}>Wishlist</button>
                <button onClick={handleAddProductToWishlist}>
                  Add to Cart
                </button>
              </li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};
