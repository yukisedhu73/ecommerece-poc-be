const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const allowedOrigins = [
  "http://localhost:4200",
  "https://ecommerece-poc-fe.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman) or from whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/products", productRoutes);

// Handle 404 for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional, improves clarity)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
