import { useState } from "react";

import "./ProductList.css";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/products.context";

import wishListLogo from "../../assets/wishlist-logo.png";
import { useAuth } from "../../contexts/auth.context";
import axios from "axios";

export const ProductList = () => {
  const { allProducts } = useProducts();
  const { user, setUser } = useAuth();
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

  const config = {
    headers: {
      authorization: user.token,
    },
  };

  const handleAddProductToCart = async (product) => {
    try {
      const res = await axios.post("/api/user/cart", { product }, config);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProductToWishlist = async (product) => {
    try {
      const res = await axios.post("/api/user/wishlist", { product }, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsProductInCart = (productId) => {
    const res = user.user.cart.find((product) => product._id === productId);
    return res ? true : false;
  };

  const getIsProductInWishlist = (productId) => {
    const res = user.user.wishlist.find((product) => product._id === productId);
    return res ? true : false;
  };

  console.log(user.user.cart);

  const handleRemoveFromCart = async (productId) => {
    console.log(productId);
    try {
      const config = {
        headers: {
          authorization: user.token,
        },
      };
      const res = await axios.delete(`/api/user/cart/${productId}`, config);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, cart: res.data.cart },
      }));
    } catch (error) {
      console.error(error);
    }
  };

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
              onChange={(e) => handleCategoriesChange(e, "mugs")}
              checked={selectedCategories.includes("mugs")}
            />
            Mugs
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "plates")}
              checked={selectedCategories.includes("plates")}
            />
            Plates
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "jwellery organizer")}
              checked={selectedCategories.includes("jwellery organizer")}
            />
            Jwellery Organizers
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "showpieces")}
              checked={selectedCategories.includes("showpieces")}
            />
            Showpieces
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "planters")}
              checked={selectedCategories.includes("planters")}
            />
            Planters
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "lamps")}
              checked={selectedCategories.includes("lamps")}
            />
            Lamps
          </li>
          <li className="category-checkbox">
            <input
              type="checkbox"
              onChange={(e) => handleCategoriesChange(e, "spoons")}
              checked={selectedCategories.includes("spoons")}
            />
            Spoons
          </li>
        </ul>
      </div>
      <section className="product-list-section">
        <ul className="product-list">
          {selectedCategoryProducts.map((product) => (
            <div className="product-card">
              <li key={product._id}>
                <Link key={product._id} to={`/products/${product._id}`}>
                  <div className="product-img-container">
                    <img
                      src={product.img}
                      atl={product.name}
                      className="product-img"
                    ></img>
                  </div>
                </Link>
                <div className="product-card-details">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">₹{product.price}</p>
                  {!getIsProductInWishlist(product._id) ? (
                    <button
                      className="cart-btn"
                      onClick={() => handleAddProductToWishlist(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="cart-btn"
                      onClick={() => handleRemoveFromWishlist(product._id)}
                    >
                      Remove from Cart
                    </button>
                  )}

                  {!getIsProductInCart(product._id) ? (
                    <button
                      className="cart-btn"
                      onClick={() => handleAddProductToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="cart-btn"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};
