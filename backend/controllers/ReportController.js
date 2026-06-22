const AttendanceRecord = require("../models/AttendanceRecord");

const markAttendance = async (req, res) => {
  try {
    const record = await AttendanceRecord.create(req.body);

    res.status(201).json({
      success: true,
      record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAttendanceRecords = async (req, res) => {
  try {
    const records = await AttendanceRecord
      .find()
      .populate("student")
      .populate({
  path: "session",
  populate: {
    path: "subject faculty"
  }
});

    res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  markAttendance,
  getAttendanceRecords
};