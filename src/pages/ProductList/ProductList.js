import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TiHeartFullOutline } from "react-icons/ti";
import { TbHeartPlus } from "react-icons/tb";

import "./ProductList.css";
import { useProducts } from "../../contexts/products.context";
import { useAuth } from "../../contexts/auth.context";

import {
  addProductToCart,
  addProductToWishlist,
  getIsProductInCart,
  getIsProductInWishlist,
  removeProductFromWishlist,
} from "../../utils/cart.utils";
import Loader from "../../components/Loader/Loader";

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { allProducts, isProductsLoading } = useProducts();
  const { user, setUser } = useAuth();
  const [priceRange, setPriceRange] = useState(8000);
  const [sortValue, setSortValue] = useState("");

  const sortByPriceArr = [
    { label: "High to Low", value: "htl" },
    { label: "Low to High", value: "lth" },
    { label: "Reset", value: "reset" },
  ];

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

  const getFilteredProductsByPrice = (products) => {
    return products.filter((product) => product.price <= priceRange);
  };

  const inStockProducts = getInStockProducts(allProducts, inStockToggle);

  const selectedCategoryProducts = getSelectedCategoryProducts(
    inStockProducts,
    selectedCategories
  );

  const filteredProductsByPrice = getFilteredProductsByPrice(
    selectedCategoryProducts
  );

  const handleAddProductToWishlist = async (product) => {
    if (isLogged) {
      if (getIsProductInWishlist(wishlist, product?._id)) {
        const res = await removeProductFromWishlist(product._id, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item removed from Wishlist", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await addProductToWishlist(product, encodedToken);
        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, wishlist: res.data.wishlist },
        }));
        toast.success("Item added to Wishlist", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Please login to continue", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

        toast.success("Item added to Cart", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Please login to continue", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/login");
    }
  };

  const getSortedByPriceProducts = (products) => {
    if (sortValue === "htl") {
      return products.sort(
        (product1, product2) => product2.price - product1.price
      );
    } else if (sortValue === "lth") {
      return products.sort(
        (product1, product2) => product1.price - product2.price
      );
    } else {
      return products;
    }
  };
  const sortedByPriceProducts = getSortedByPriceProducts(
    filteredProductsByPrice
  );

  const handleClearFilters = () => {
    setInStockToggle(false);
    setSelectedCategories([]);
    setPriceRange(8000);
    setSortValue("");
  };

  return (
    <div>
      {isProductsLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>Showing Items ({sortedByPriceProducts.length})</h2>
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h1>Filters</h1>
              <button className="clear-filter-btn" onClick={handleClearFilters}>
                Clear
              </button>
            </div>
            <h3>Availability</h3>
            <p className="sidebar-text">
              <input
                type="checkbox"
                onChange={handleInStockToggle}
                value={inStockToggle}
              />
              In Stock only
            </p>
            <ul>
              <h3>Categories</h3>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "mugs")}
                  checked={selectedCategories.includes("mugs")}
                />
                Mugs
              </li>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "plates")}
                  checked={selectedCategories.includes("plates")}
                />
                Plates
              </li>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCategoriesChange(e, "jwellery organizer")
                  }
                  checked={selectedCategories.includes("jwellery organizer")}
                />
                Jwellery Organizers
              </li>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "showpieces")}
                  checked={selectedCategories.includes("showpieces")}
                />
                Showpieces
              </li>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "planters")}
                  checked={selectedCategories.includes("planters")}
                />
                Planters
              </li>
              <li className="category-checkbox sidebar-text">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "lamps")}
                  checked={selectedCategories.includes("lamps")}
                />
                Lamps
              </li>
              <li className="category-checkbox sidebar-text ">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoriesChange(e, "spoons")}
                  checked={selectedCategories.includes("spoons")}
                />
                Spoons
              </li>
            </ul>
            <div>
              <h3>Price range</h3>
              <input
                className="price-range"
                min={100}
                max={6500}
                value={priceRange}
                type="range"
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <p className="sidebar-text">Rs. 100 - Rs.{priceRange}</p>
            </div>
            <div>
              <h3>Sort</h3>
              {sortByPriceArr.map(({ label, value }) => (
                <p className="sidebar-text" key={value}>
                  <input
                    type="radio"
                    name="sort"
                    value={value}
                    checked={sortValue === value}
                    onChange={(e) => setSortValue(value)}
                  />
                  {label}
                </p>
              ))}
            </div>
          </div>
          <section className="product-list-section">
            <ul className="product-list">
              {sortedByPriceProducts.map((product) => (
                <div className="product-card">
                  <li key={product._id}>
                    <Link key={product._id} to={`/products/${product._id}`}>
                      <div className="product-img-container">
                        <img
                          src={product.img}
                          atl={product.name}
                          className="product-img"
                        ></img>
                        {product.inStock ? (
                          <></>
                        ) : (
                          <>
                            <div className="stock-opacity-layer"></div>
                            <p>Out of Stock</p>
                          </>
                        )}
                        {product.bestseller ? (
                          <>
                            <div className="bestseller-bg">BESTSELLER</div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                    <div className="product-details">
                      <p className="product-name">{product.name}</p>

                      <div className="product-card-details">
                        <p className="product-price">₹{product.price}</p>
                        <div className="btn-container">
                          <button
                            className="product-card-wishlist-btn"
                            onClick={() => handleAddProductToWishlist(product)}
                          >
                            {getIsProductInWishlist(wishlist, product?._id) ? (
                              <TiHeartFullOutline />
                            ) : (
                              <TbHeartPlus />
                            )}
                          </button>

                          <button
                            className={
                              getIsProductInCart(cart, product._id)
                                ? "product-card-cart-btn2"
                                : "product-card-cart-btn"
                            }
                            onClick={() => handleAddProductToCart(product)}
                          >
                            {getIsProductInCart(cart, product._id)
                              ? "View in bag"
                              : "Add to Bag"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};
