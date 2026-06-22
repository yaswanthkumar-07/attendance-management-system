const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Subject = require("../models/Subject");
const AttendanceRecord = require("../models/AttendanceRecord");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculty = await Faculty.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalAttendance = await AttendanceRecord.countDocuments();

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalFaculty,
        totalSubjects,
        totalAttendance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};