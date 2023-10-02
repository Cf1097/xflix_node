const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema({
  upVotes: {
      type: Number,
      default: 0
  },
  downVotes: {
      type: Number,
      default: 0
  }
})

const videoSchema = new mongoose.Schema({
  // _id: {
  //     type: String,
  //     default: new mongoose.Types.ObjectId,
  // },
  votes: {
      upVotes: {
          type: Number,
          default: 0
      },
      downVotes: {
          type: Number,
          default: 0
      }
  },
  previewImage: {
      type: String,
      // required: true
  },
  viewCount: {
      type: Number,
      default: 0
  },
  videoLink: {
      type: String,
      // required: true
  },
  title: {
      type: String,
      required: true
  },
  genre: {
      type: String,
      required: true
  },
  contentRating: {
      type: String,
      required: true,
  },
  releaseDate: {
      type: Date,
      required: true,
  }
});

module.exports.Video = mongoose.model("Videos", videoSchema);