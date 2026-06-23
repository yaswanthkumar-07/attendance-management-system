const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("faculty");

    res.json({
      success: true,
      count: subjects.length,
      subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSubject,
  getSubjects
};