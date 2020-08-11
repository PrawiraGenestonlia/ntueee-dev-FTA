const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  mentor: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  // studentDetails: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  // mentorDetails: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // }
})

module.exports = mongoose.model('mentor', mentorSchema);