const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    faceId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);