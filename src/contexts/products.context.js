import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllProductsService } from "../services/products.service";

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getAllProductsService();
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(isLoading);

  return (
    <ProductsContext.Provider
      value={{ allProducts, setAllProducts, isProductsLoading: isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
