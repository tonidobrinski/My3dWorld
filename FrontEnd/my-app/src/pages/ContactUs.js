import React from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/contact-us", formData);
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Контакти</h1>
      </div>
      <div className="container">
        <h2>Свържи се с нас</h2>
        <p>Ще се радваме да чуем от вас. Моля, попълнете полетата по-долу:</p>
        <div className="container-fields">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Твоите имена:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Въведи своите имена"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Твоят Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Въведи Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="message">Съобщение:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Въведи съобщение..."
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <div className="container-button">
              <button type="submit">Изпрати</button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUsPage;
