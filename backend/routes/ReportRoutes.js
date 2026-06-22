const express = require("express");

const {
  markAttendance,
  scanAttendance,
  getAttendanceRecords
} = require("../controllers/ReportController");

const router = express.Router();

router.post("/", markAttendance);
router.post("/scan", scanAttendance);
router.get("/", getAttendanceRecords);

module.exports = router;