import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext"; // Import useUserContext
import Footer from "../pages/Footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login, logout } = useUserContext(); // Access user, login, and logout from the context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend to handle login
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );

      // Handle successful login
      console.log("Login successful:", response.data);

      // Call the login function to update the user context
      login(response.data);

      // You can also store user data in cookies for later use

      // Redirect the user to the home page or a protected route
      navigate("/"); // Redirect to the home page
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);

      // Display an error message to the user
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Hello {user.first_name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <div className="login-container">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Въведи email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="login-email"
                />
              </div>
              <div>
                <label>Парола:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Въведи Парола"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="login-password"
                />
              </div>
              <div className="login-container-button">
                <button type="submit">Влез</button>
              </div>
            </form>
            <p>
              Нямаш акаунт? <Link to="/register">Регистрирай се</Link>
            </p>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Add the registration link */}
        </>
      )}
      <Footer />
    </div>
  );
};

export default LoginPage;
