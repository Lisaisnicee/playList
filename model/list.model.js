const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

const List = model('List', listSchema);

module.exports = List;
