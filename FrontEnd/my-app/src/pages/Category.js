import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import the Link component
import "./Category.css"; // Import the CSS file with the styles
import Footer from "./Footer";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <h1>Категории</h1>
      <Link to="/">Начало</Link> / Категории
      <div className="category-container">
        {categories.map((category) => (
          <Link
            to={`/categories/products/${category.category_id}`}
            key={category.category_name}
          >
            <div className="category-item">
              <img
                src={category.category_img}
                alt={category.category_name}
                className="category-image"
              />
              <p className="category-title">{category.category_name}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Category;
