import { useParams } from "react-router-dom";
import React from "react";

import { useProducts } from "../../contexts/products.context";

const ProductDetails = () => {
  const { productId } = useParams();
  const { allProducts } = useProducts();
  const singleProduct = allProducts.find((product) => product.id === productId);
  console.log(singleProduct);
  console.log(productId);
  return (
    <div className="product-details-section">
      <div>
        <img
          className="product-img"
          src={singleProduct.img}
          alt={singleProduct.name}
        ></img>
      </div>
      <div>
        <h1>{singleProduct.name}</h1>
        <h3>{singleProduct.price}$</h3>
      </div>
    </div>
  );
};

export default ProductDetails;
