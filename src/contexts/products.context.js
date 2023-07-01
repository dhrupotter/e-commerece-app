import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllProductsService } from "../services/products.service";

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await getAllProductsService();
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    console.log("hi");
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts, setAllProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
