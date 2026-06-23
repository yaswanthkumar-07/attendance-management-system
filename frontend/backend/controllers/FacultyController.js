const Faculty = require("../models/Faculty");

const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      success: true,
      faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();

    res.json({
      success: true,
      count: faculties.length,
      faculties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createFaculty,
  getFaculties
};