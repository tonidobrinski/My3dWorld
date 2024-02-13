import React, { useState, useEffect } from "react";
import { checkAuthStatus } from "../authentication/Auth.js"; // Import the function

const AccountPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = checkAuthStatus();
    if (loggedInUser) {
      setUser(loggedInUser); // Set the user state if logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Remove the JWT token from local storage
    setUser(null); // Clear the user state
    // You can also make an API request to the server to log out on the server-side if needed
  };

  return (
    <div>
      <nav>
        <ul>
          <li>{user ? `Logged in as ${user.email}` : "Not logged in"}</li>
          {user && <li onClick={handleLogout}>Logout</li>}
        </ul>
      </nav>
    </div>
  );
};

export default AccountPage;
