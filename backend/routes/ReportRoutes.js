const express = require("express");

const {
  markAttendance,
  getAttendanceRecords
} = require("../controllers/ReportController");

const router = express.Router();

router.post("/", markAttendance);
router.get("/", getAttendanceRecords);

module.exports = router;