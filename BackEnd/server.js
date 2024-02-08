const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const categories = require("./categories");
const { v4: uuidv4 } = require("uuid");

const secretKey = "654b5541-64b7-4d59-a27a-277419a22c47";
// console.log("Session Secret Key:", secretKey);

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: false,
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ message: "Access granted to protected route" });
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my3dworld2",
  connectionLimit: 10,
});

const saltRounds = 10; 

app.get("/users", (req, res) => {
  const token = req.header("Authorization"); 
  console.log(token);
  const user = jwt.verify(token, secretKey);
  console.log(user);
  if (user["role"] !== 2) {
    return res.status(404);
  }
  // console.log(req.params.token);
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { first_name, last_name, email, password, role_id } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  pool.query(
    "INSERT INTO users (first_name, last_name, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, email, hashedPassword, 1], // Default role: Buyer
    (error, result) => {
      if (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Registration failed" });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  pool.query(
    "DELETE FROM users WHERE user_id = " + userId,
    [userId],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(204).end();
      }
    }
  );
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, role_id } = req.body;
  console.log(userId);

  pool.query(
    `UPDATE users SET first_name = "${first_name}", last_name = "${last_name}", email = "${email}", role_id = ${role_id} WHERE user_id = ${userId}`,
    [first_name, last_name, email, role_id, userId],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const validatePassword = (email, password, callback) => {
  pool.query(
    "SELECT password_hash FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, false);
      }
      if (results.length === 0) {
        return callback(null, false);
      }
      const hashedPassword = results[0].password_hash;
      const passwordIsValid = bcrypt.compareSync(password, hashedPassword);
      callback(null, passwordIsValid);
    }
  );
};

const isEmailRegistered = (email, callback) => {
  pool.query(
    "SELECT COUNT(*) AS count FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }
      const isRegistered = results[0].count > 0;
      callback(null, isRegistered);
    }
  );
};

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO Users (first_name, last_name, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, email, hashedPassword, 1];

    pool.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ==========

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM Users WHERE email = ?";
    const values = [email];
    pool.query(sql, values, async (error, results) => {
      const user = results[0];

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          email,
          role: user.role_id,
          first_name: user.first_name,
          last_name: user.last_name,
          userId: user.user_id,
        },
        secretKey
      );

      res.cookie("jwt", token, { httpOnly: true, secure: true });

      res.status(200).json({
        message: "Login successful",
        user: user.first_name,
        token: token,
        role_id: user.role_id,
        user_id: user.user_id,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// =========

app.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/"); 

});
// ========

const validateJwtMiddleware = (req, res, next) => {
  const token = req.header("Authorization"); 

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token." });
  }
};

app.get("/protected-route", validateJwtMiddleware, (req, res) => {
  res.json({ message: "Access granted." });
});

const isAdminMiddleware = (req, res, next) => {
  if (req.user.role === "Admin") {
    next(); 
  } else {
    res.status(403).json({ message: "Access denied. Requires Admin role." });
  }
};
app.get("/admin", isAdminMiddleware, (req, res) => {
  res.json({ message: "Admin dashboard" });
});
// =======

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const resetToken = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: "1h",
  });

  const sendResetEmail = (toEmail, resetToken) => {
    const mailOptions = {
      from: "druidxdd@gmail.com",
      to: toEmail,
      subject: "Password Reset Request",
      html: `
      <p>Hello,</p>
      <p>You have requested a password reset. Click the following link to reset your password:</p>
      <a href="http://your-app-reset-url/${resetToken}">Reset Password</a>
      <p>If you did not request this password reset, please ignore this email.</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };

  res.json({ message: "Password reset email sent" });
});

app.get("/reset-password/:token", async (req, res) => {
  const resetToken = req.params.token;

  jwt.verify(resetToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    res.json({ message: "You can reset your password here" });
  });
});

app.post("/reset-password/:token", async (req, res) => {
  const resetToken = req.params.token;
  const newPassword = req.body.newPassword;

  jwt.verify(resetToken, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userId = decoded.userId;
    const updated = await updatePassword(userId, newPassword);

    if (!updated) {
      return res.status(500).json({ error: "Password update failed" });
    }

    res.json({ message: "Password updated successfully" });
  });
});
// ========

app.get("/api/categories", async (req, res) => {
  try {
    const [categoriesFromDB] = await pool
      .promise()
      .query("SELECT * FROM categories");

    res.json(categoriesFromDB);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories." });
  }
});
// =======

app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const [productFromDB] = await pool
      .promise()
      .query("SELECT * FROM Products WHERE category_id = " + [productId]);
    // console.log(productId);

    if (productFromDB.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productFromDB);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
});

// =======

app.get("/api/product_details/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const [productDetails] = await pool
      .promise()
      .query("SELECT * FROM Products WHERE product_id = " + [productId]);
    console.log(productDetails);
    if (productDetails.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productDetails[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product details." });
  }
});
// =========

app.post("/api/reviews", validateJwtMiddleware, async (req, res) => {
  try {
    const { productId, reviewText } = req.body;
    const user = req.user;
    const sql = `INSERT INTO Reviews (user_id, product_id, review_text) VALUES (${user.userId}, ${productId}, "${reviewText}")`;
    const values = [productId, reviewText];

    await pool.promise().query(sql, values);

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the review" });
  }
});
// =========

app.get("/api/reviews/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const [reviewsFromDB] = await pool.promise().query(
      `
      SELECT 
        Reviews.user_id,
        Reviews.review_text,
        Users.first_name,
        Users.last_name,
        Reviews.timestamp
      FROM Reviews
      INNER JOIN Users ON Users.user_id = Reviews.user_id
      WHERE product_id = 
    ` + [productId]
    );
    console.log(reviewsFromDB);
    res.json(reviewsFromDB);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "An error occurred while fetching reviews" });
  }
});
//  =======

app.post("/api/ratings", validateJwtMiddleware, async (req, res) => {
  const { user_id, product_id, rating } = req.body;
  const user = req.user;
  console.log({ user_id, product_id, rating });
  try {
    const [userRating] = await pool
      .promise()
      .query(
        `SELECT * FROM Rating WHERE user_id = ${user.userId} and product_id = ${product_id}`
      );
    if (userRating.length > 0) {
      await pool
        .promise()
        .query(
          `UPDATE Rating SET rating_value = ${rating} WHERE user_id = ${user.userId} AND product_id = ${product_id}`
        );

      res.status(200).json({ message: "Rating updated successfully" });
    } else {
      await pool
        .promise()
        .query(
          `INSERT INTO Rating (user_id, product_id, rating_value) VALUES (${user.userId}, ${product_id}, ${rating})`
        );

      res.status(201).json({ message: "Rating submitted successfully" });
    }
  } catch (error) {
    console.error("Error submitting or updating rating:", error);
    res.status(500).json({
      error: "An error occurred while submitting or updating the rating",
    });
  }
});

app.get("/api/ratings/average/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const [averageRating] = await pool
      .promise()
      .query(
        `SELECT AVG(rating_value) AS average FROM Rating WHERE product_id = ${productId}`,
        [productId]
      );
    console.log(averageRating);
    res.json(averageRating[0]);
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the average rating" });
  }
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "druidxdd@gmail.com",
    pass: "ginriurfkosvclur",
  },
});

app.post("/contact-us", (req, res) => {
  const { name, email, message } = req.body;
  console.log({ name, email, message });

  const mailOptions = {
    from: "tdobrinski@abv.bg",
    to: "druidxdd@gmail.com", 
    subject: "My3dWorld Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
