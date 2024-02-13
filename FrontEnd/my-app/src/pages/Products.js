import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import the Link component
import "./Products.css"; // Import the CSS file with the styles
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${params.productId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Продукти</h1>
      <Link to="/">Начало</Link> / <Link to="/categories">Категории</Link> /
      Продукти
      <div className="product-container">
        {products.map((product) => (
          <Link to={`/products/${product.product_id}`} key={product.product_id}>
            <div className="category-item">
              <img
                src={`${product.product_img}`}
                alt={product.product_name}
                className="category-product-image"
              />
              <p className="product-title">{product.product_name}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
