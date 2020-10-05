const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    additionalAddressDescription: {
      type: String,
    },
    area: {
      type: String,
    },
    className: {
      type: String,
    },
    dateToStart: {
      type: String,
    },
    daysPerWeek: {
      type: String,
    },
    district: {
      type: String,
    },
    PostedBy: {
      type: String,
    },
    instituteName: {
      type: String,
    },
    medium: {
      type: String,
    },
    numberOfStudents: {
      type: String,
    },
    salary: {
      type: Number,
    },
    studentsGender: {
      type: String,
    },
    subjects: {
      type: [String],
    },
    teachersGender: {
      type: String,
    },
    time: {
      type: String,
    },
    tutorType: {
      type: String,
    },
    applied: [
      {
        applicatentId: Schema.Types.ObjectId,
        appicationMessage: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
module.exports = model("Job", jobSchema);
