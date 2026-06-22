const express = require("express");

const {
  createSession,
  getSessions
} = require("../controllers/AttendanceController");

const router = express.Router();

router.post("/", createSession);
router.get("/", getSessions);

module.exports = router;