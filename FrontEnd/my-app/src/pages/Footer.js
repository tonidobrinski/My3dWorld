// Footer.js

import React from "react";
import "./Footer.css"; // Import your new CSS file

function Footer() {
  return (
    <div className="footer_container content-container">
      <footer className="main_footer footer--pin">
        {" "}
        {/* Use the class name directly */}
        <div className="upper_footer">
          <div className="upper_footer_item section_title">
            <h4>Свържете се с нас</h4>
            <p>Телефон: (+359) 887 924 197</p>
            <p>Email: info@my3dworld.bg</p>
            <p>Адрес: кв.Кючук Париж,4000 Пловдив, България</p>
          </div>
          <div className="upper_footer_item footer_links">
            <h4>Бързи линкове</h4>
            <div>
              <a href="/about-us">За нас</a>
              <a href="/categories">Категории</a>
              <a href="/contact-us">Контакти</a>
            </div>
          </div>
          <div className="upper_footer_item footer_follow_us">
            <h4>Последвайте ни тук</h4>
            <a href="https://www.facebook.com/My3DWorldbg/">Facebook</a>
            <a href="https://www.instagram.com/my3dworld/">Instagram</a>
          </div>
          <div className="upper_footer_item footer_delivery_info">
            <h4>Информация за доставка</h4>
            <div>
              <a href="/how-can-i-order">Как да поръчаме</a>
            </div>
          </div>
        </div>
        <div className="sub_footer">
          <p>
            Copyright © 2023 by <a href="/">My3DWorld</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
