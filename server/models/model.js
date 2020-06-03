const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  position: {
    x_loc: {
      type: Number,
      required: true,
    },
    y_loc: {
      type: Number,
      required: true,
    }
  },
  // created_by: {
  //   type: String,
  //   required: true
  // },
  published_date: {
    type: Date
  },
  resolved: {
    type: Boolean,
  },
  // responses: [this] LETS DO THIS LATER 
})

const Comments = mongoose.model('comments', CommentSchema);

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image_url: {
    type: String,
    required: true
  },
  // created_by: {
  //   type: String,
  //   required: true
  // },
  published_date: {
    type: Date
  },
  comments: [CommentSchema]
})

const Boards = mongoose.model('boards', BoardSchema);

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  // created_by: {
  //   type: String,
  //   required: true
  // },
  published_date: {
    type: Date
  },
  boards: [BoardSchema]
});

const Projects = mongoose.model('projects', ProjectSchema);

module.exports = {
  Projects,
  Comments,
  Boards,
};