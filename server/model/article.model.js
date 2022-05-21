const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
<<<<<<< HEAD
      required: ["true", "please add title"]
    },
    content: {
      type: String,
      required: ["true", "please add content"]
=======
      required: ["true", "please add title"],
    },
    content: {
      type: String,
      required: ["true", "please add content"],
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    },
    excerpt: {
      type: String,
      maxlength: 500,
<<<<<<< HEAD
      required: ["true", "please add excerpt"]
=======
      required: ["true", "please add excerpt"],
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
<<<<<<< HEAD
      required: true
=======
      required: true,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    },
    director: {
      type: String,
      maxlength: 500,
<<<<<<< HEAD
      required: ["true", "please add excerpt"]
=======
      required: ["true", "please add excerpt"],
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    },
    actors: {
      type: [String],
      required: true,
      validate: {
        validator: function (array) {
          return array.length >= 2;
        },
<<<<<<< HEAD
        message: "add minimum 2"
      }
=======
        message: "add minimum 2",
      },
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "public"],
      default: "draft",
<<<<<<< HEAD
      index: true
    }
  },
  {
    timestamps: true
=======
      index: true,
    },
  },
  {
    timestamps: true,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
  }
);

articleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Article", articleSchema);
