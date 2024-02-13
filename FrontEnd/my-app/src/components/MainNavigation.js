import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useUserContext } from "../UserContext"; // Import the useUserContext hook

function MainNavigation() {
  const user = localStorage.getItem("first_name");
  const { logout } = useUserContext(); // Destructure user and logout function
  const [logoutMessage, setLogoutMessage] = useState(""); // State variable for logout message

  const handleLogout = async () => {
    try {
      await logout();
      setLogoutMessage("Вие успешно излязохте от акаунта си.");

      // Clear the message after 5 seconds
      setTimeout(() => {
        setLogoutMessage("");
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutMessage("Logout failed. Please try again.");
    }
  };

  // useEffect to clear the message when it changes
  useEffect(() => {
    if (logoutMessage) {
      const timeoutId = setTimeout(() => {
        setLogoutMessage("");
      }, 10000);

      // Cleanup the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [logoutMessage]);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={() => undefined} end>
              My3dWorld
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Начало
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Категории
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              За нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Контакти
            </NavLink>
          </li>
          <li className={(classes.section_header, classes.account)}>
            {user ? (
              <>
                <div id="logout-btn">
                  <p>Здравей, {user}</p>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Вход
              </NavLink>
            )}
          </li>
          {localStorage.getItem("role") === "2" && (
            <li className={(classes.section_header, classes.cart)}>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Потребители
              </NavLink>
            </li>
          )}
        </ul>
        <span className="logout-msg">
        {logoutMessage && <p>{logoutMessage}</p>} {/* Display logout message */}
        </span>
      </nav>
    </header>
  );
}

export default MainNavigation;
