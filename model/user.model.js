const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  playlists : [
    {
    type: SchemaTypes.ObjectId,
    ref : 'playList'
    }
  ]
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;
