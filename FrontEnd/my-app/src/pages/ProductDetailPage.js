/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../UserContext"; // Import useUserContext
import "./ProductDetailPage.css";
import Footer from "./Footer";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user } = useUserContext(); // Access user data from the context
  // State to store user's rating input
  const [userRating, setUserRating] = useState(0);
  // State to store the average rating for the product
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch the product details based on the productId
    axios
      .get(`http://localhost:3000/api/product_details/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });

    // Fetch the average rating for the product
    axios
      .get(`http://localhost:3000/api/ratings/average/${productId}`)
      .then((response) => {
        setAverageRating(parseFloat(response.data.average) || 0); // Update averageRating state here
      })
      .catch((error) => {
        console.error("Error fetching average rating:", error);
      });

    // Fetch reviews for the product
    axios
      .get(`http://localhost:3000/api/reviews/${productId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to submit a review
      const response = await axios.post(
        "http://localhost:3000/api/reviews",
        {
          productId,
          reviewText,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Clear the review text input
      setReviewText("");

      // Update the reviews state with the new review
      setReviews([...reviews, response.data]); // <-- Update the reviews state

      // Refresh the reviews
      axios
        .get(`http://localhost:3000/api/reviews/${productId}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Function to submit a user's rating
  const submitRating = async () => {
    try {
      // Make a POST request to submit a rating
      await axios.post(
        "http://localhost:3000/api/ratings",
        {
          user_id: localStorage.getItem("user_id"),
          product_id: productId,
          rating: userRating,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // You can update the average rating here if needed
      // Fetch the updated average rating after submission (optional)

      // Update UI or show a message indicating successful rating submission
      // For example, you can display a success message or update the average rating display

      // You can also update the average rating here if needed

      // Refresh the average rating for the product
      axios
        .get(`http://localhost:3000/api/ratings/average/${productId}`)
        .then((response) => {
          setAverageRating(parseFloat(response.data.average) || 0);
        })
        .catch((error) => {
          console.error("Error fetching updated average rating:", error);
        });
    } catch (error) {
      console.error("Error submitting rating:", error);
      // Handle rating submission error
    }
  };

  return (
    <>
      <div className="product-detail-container">
        {/* Product information */}
        {/* ... (existing code for product details) */}
        {product && (
          <>
            <Link to="/">Начало</Link> / <Link to="/categories">Категории</Link>{" "}
            /
            <Link to={`/categories/products/${product.category_id}`}>
              Продукти
            </Link>{" "}
            /{product.product_name}
            <div className="product">
              <div className="product-images">
                <img
                  src={`${product.product_img}`}
                  alt={product.product_name}
                  className="product-image"
                />
              </div>
              <div className="product-details-wrapper">
                <div className="product-details">
                  <h1 className="product-name">{product.product_name}</h1>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Цена: {product.price}лв.</p>
                  <Link to="/how-can-i-order">
                    <button className="add-to-cart-button btn-hover color-8">
                      Как да поръчам?
                    </button>
                  </Link>
                  {/* rating */}
                  <div className="product-rating">
                    <p>
                      Средна оценка: <span className="star">★</span>
                      {averageRating.toFixed(1)}{" "}
                      <span className="product-rating-star-text">/5</span>
                    </p>
                    {/* Display UI for user to submit a rating */}
                    {/* For example, you can use star icons */}
                    <div></div>
                    <span>Направи оценка: </span>
                    <span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={`rating - value${star}`}
                          onClick={() => setUserRating(star)}
                          style={{
                            cursor: "pointer",
                            color: star <= userRating ? "gold" : "gray",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                  <button
                    onClick={submitRating}
                    className="submit-rating btn-hover color-5"
                  >
                    Оцени
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Review section */}
        <div className="review-whole-container">

        {localStorage.getItem("token") && (
          <div className="review-section">
            <h2>Направи Отзив
            </h2>
            <form onSubmit={handleSubmitReview} className="review">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Напиши отзив..."
                required
                maxlength="256"
                ></textarea>
              <button type="submit" className="review-submit-button">
                Изпрати
              </button>
            </form>
          </div>
        )}

        <div className="review-list">
          <h2>Отзиви</h2>
          <ul>
            {reviews.map((review) => (
              <div className="review-container">
                <li key={review.review_id}>
                  <strong className="reviewer-name">
                    {review.first_name + " " + review.last_name}:
                  </strong>
                  <div className="review-text">{review.review_text}</div>
                  <p className="review-timestamp">
                    {new Date(review.timestamp).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    })}
                  </p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
            </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
