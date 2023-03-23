const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  listId: {
    type: SchemaTypes.ObjectId,
    ref: 'List',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required : true
  },
 
}, { timestamps: true });

const toDo = model('toDo', todoSchema);

module.exports = toDo;
