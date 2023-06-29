import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});

  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts, setAllProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
