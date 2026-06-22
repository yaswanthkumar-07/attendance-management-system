const AttendanceSession = require("../models/AttendanceSession");
const QRCode = require("qrcode");

const createSession = async (req, res) => {
  try {
    const { subject, faculty, sessionCode } = req.body;

    const qrData = JSON.stringify({
      sessionCode
    });

    const qrCode = await QRCode.toDataURL(qrData);

    const session = await AttendanceSession.create({
      subject,
      faculty,
      sessionCode,
      qrCode
    });

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