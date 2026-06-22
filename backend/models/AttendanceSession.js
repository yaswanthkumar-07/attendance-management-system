const mongoose = require("mongoose");

const attendanceSessionSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },

    sessionCode: {
      type: String,
      required: true,
      unique: true
    },

    qrCode: {
      type: String,
      default: null
    },

    startTime: {
      type: Date,
      default: Date.now
    },

    endTime: {
      type: Date
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "AttendanceSession",
  attendanceSessionSchema
);