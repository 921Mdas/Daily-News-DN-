const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      required: ["true", "please add title"],
    },
    content: {
      type: String,
      required: ["true", "please add content"],
    },
    excerpt: {
      type: String,
      maxlength: 500,
      required: ["true", "please add excerpt"],
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    director: {
      type: String,
      maxlength: 500,
      required: ["true", "please add excerpt"],
    },
    actors: {
      type: [String],
      required: true,
      validate: {
        validator: function (array) {
          return array.length >= 2;
        },
        message: "add minimum 2",
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "public"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Article", articleSchema);
