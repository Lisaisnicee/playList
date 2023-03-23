const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
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

userSchema.pre('save', async function(){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password,saltRounds );
});
const User = model('User', userSchema);

module.exports = User;
