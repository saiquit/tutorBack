const { Schema, model } = require("mongoose");

const districtSchema = new Schema(
  {
    id: Number,
    name: String,
    bn_name: String,
  },
  {
    timestamps: true,
  },
);

const areaSchema = new Schema(
  {
    district_id: Number,
    name: String,
    bn_name: String,
  },
  {
    timestamps: true,
  },
);

const groupSchema = new Schema(
  {
    group_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const inistituteNameSchema = new Schema({
  institute_name: String,
});

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: String,
        ref: "Course",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const courseSchema = new Schema(
  {
    category_name: {
      type: [String],
      required: true,
    },
    class_name: {
      type: String,
      required: true,
    },
    subs: {
      type: [String],
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

exports.District = model("District", districtSchema);
exports.Area = model("Area", areaSchema);
exports.Group = model("Group", groupSchema);
exports.Institute = model("InistituteName", inistituteNameSchema);
exports.Category = model("Category", categorySchema);
exports.Course = model("Course", courseSchema);
