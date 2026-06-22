const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/AuthRoutes");
const protect = require("./middleware/AuthMiddleware");
const authorize = require("./middleware/RoleMiddleware");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Attendance Management System",
    status: "Running"
  });
});

app.get(
  "/api/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin"
    });
  }
);

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});