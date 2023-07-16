import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./ProductList.css";
import { useProducts } from "../../contexts/products.context";
import { useAuth } from "../../contexts/auth.context";

import wishListLogo from "../../assets/wishlist-logo.png";
import {
  addProductToCart,
  addProductToWishlist,
  getIsProductInCart,
  getIsProductInWishlist,
  removeProductFromWishlist,
  removeProductFromCart,
} from "../../utils/cart.utils";

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { allProducts } = useProducts();
  const { user, setUser } = useAuth();

  const defaultSelectedCategories = searchParams.get("category")
    ? [searchParams.get("category")]
    : [];

  const [inStockToggle, setInStockToggle] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    defaultSelectedCategories
  );

  const isLogged = user?.token?.length > 0;
  const encodedToken = { headers: { authorization: user?.token } };
  const cart = user?.user?.cart;
  const wishlist = user?.user?.wishlist;

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

  const handleAddProductToWishlist = async (product) => {
    if (isLogged) {
      if (getIsProductInWishlist(wishlist, product?._id)) {
        const res = await removeProductFromWishlist(product._id, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item removed from Wishlsit");
      } else {
        const res = await addProductToWishlist(product, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item added to Wishlist");
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddProductToCart = async (product) => {
    if (isLogged) {
      if (getIsProductInCart(cart, product?._id)) {
        navigate("/cart");
      } else {
        const res = await addProductToCart(product, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, cart: res.data.cart },
        }));

        toast.success("Item added to Cart");
      }
    } else {
      toast.error("Please login to continue");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Showing Items ({selectedCategoryProducts.length})</h2>
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
                  <div>
                    <button
                      className="cart-btn"
                      onClick={() => handleAddProductToWishlist(product)}
                    >
                      {getIsProductInWishlist(wishlist, product?._id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </button>

                    <button
                      className="cart-btn"
                      onClick={() => handleAddProductToCart(product)}
                    >
                      {getIsProductInCart(cart, product._id)
                        ? "Show Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};
