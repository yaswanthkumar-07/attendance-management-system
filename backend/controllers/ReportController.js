const AttendanceRecord = require("../models/AttendanceRecord");
const AttendanceSession = require("../models/AttendanceSession");

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

const scanAttendance = async (req, res) => {
  try {
    const { studentId, sessionCode } = req.body;

    const session = await AttendanceSession.findOne({
      sessionCode
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }

    const existingRecord = await AttendanceRecord.findOne({
      student: studentId,
      session: session._id
    });

    if (existingRecord) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked"
      });
    }

    const attendance = await AttendanceRecord.create({
      student: studentId,
      session: session._id,
      attendanceMethod: "qr"
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance
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
  scanAttendance,
  getAttendanceRecords
};