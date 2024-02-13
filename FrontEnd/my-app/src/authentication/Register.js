import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is missing
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Make a POST request to your backend to handle registration
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );

      // Handle successful registration
      console.log("Registration successful:", response.data);

      // Redirect the user to the login page or a protected route
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      // Handle registration failure
      console.error("Registration failed:", error);

      // Display an error message to the user
      setError("Registration failed. Please check your information.");
    }
  };

  return (
    <>
      <div className="register">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Име:</label>
            <input
              type="text"
              name="first_name"
              placeholder="Име"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Парола:</label>
            <input
              type="password"
              name="password"
              placeholder="Парола"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Потвърди Паролата:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Потвърди Паролата"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-button">
            <button type="submit">Регистрирай се</button>
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
