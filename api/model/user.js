const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    name: {
      type: String,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    postedJobs: {
      type: [Schema.Types.ObjectId],
      ref: "Job",
    },
    educationInfo: {
      curriculum: String,
      degreeTitle: String,
      group: String,
      idCard: Number,
      instituteName: String,
      studyLabel: String,
      yearOfPassing: Number,
    },
    availability: {
      area: String,
      class: [String],
      district: String,
      medium: String,
      tutorType: [String],
      subjects: [String],
      place: [String],
    },
    personalInfo: {
      additionalInfo: String,
      birthDate: Schema.Types.Date,
      detailsAddress: String,
      emergencyPhoneNumber: String,
      emergencyName: String,
      fatherName: String,
      fatherPhoneNumber: String,
      identityNumber: Number,
      identityType: String,
      overView: String,
      religion: String,
      teachersGender: String,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  },
);

module.exports = model("User", userSchema);
