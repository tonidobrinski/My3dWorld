const mysql = require("mysql2");

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my3dworld2",
  connectionLimit: 10,
});

// Define a function to fetch categories with image URLs
function getCategories(callback) {
  const query = "SELECT category_name, category_img FROM categories";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      callback(err, null);
      return;
    }

    callback(null, results);
  });
}

// Export the getCategories function for use in your Express routes
module.exports = { getCategories };
