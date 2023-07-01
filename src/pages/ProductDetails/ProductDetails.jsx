import { useParams } from "react-router-dom";
import React from "react";

import "./ProductDetails.css";
import { useProducts } from "../../contexts/products.context";

const ProductDetails = () => {
  const { productId } = useParams();
  const { allProducts } = useProducts();
  const singleProduct = allProducts.find((product) => product._id === productId);
  console.log(allProducts);
  console.log(singleProduct);
  console.log(productId);
  return (
    <div className="product-details-section">
      <section>
        <img
          className="product-details-img"
          src={singleProduct.img}
          alt={singleProduct.name}
        ></img>
      </section>
      <section className="product-description">
        <h1>{singleProduct.name}</h1>
        <h3>₹{singleProduct.price}</h3>
      </section>
    </div>
  );
};

export default ProductDetails;
