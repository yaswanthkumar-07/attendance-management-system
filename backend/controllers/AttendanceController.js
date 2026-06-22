const AttendanceSession = require("../models/AttendanceSession");

const createSession = async (req, res) => {
  try {
    const session = await AttendanceSession.create(req.body);

    res.status(201).json({
      success: true,
      session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await AttendanceSession
      .find()
      .populate("subject")
      .populate("faculty");

    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSession,
  getSessions
};