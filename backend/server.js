const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/AuthRoutes");
const studentRoutes = require("./routes/StudentRoutes");
const facultyRoutes = require("./routes/FacultyRoutes");
const subjectRoutes = require("./routes/SubjectRoutes");
const attendanceRoutes = require("./routes/AttendanceRoutes");
const reportRoutes = require("./routes/ReportRoutes");
const dashboardRoutes = require("./routes/DashboardRoutes");

const protect = require("./middleware/AuthMiddleware");
const authorize = require("./middleware/RoleMiddleware");


dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/sessions", attendanceRoutes);
app.use("/api/attendance", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Attendance Management System",
    status: "Running"
  });
});

// Protected Profile Route
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Admin Route
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});