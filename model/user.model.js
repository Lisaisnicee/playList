const { Schema, model, SchemaTypes } = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    playlists: [
      {
        type: SchemaTypes.ObjectId,
        ref: "playList",
      },
    ],
    authTokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const authToken = jwt.sign({ _id: this.id.toString() }, "foo");
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, saltRounds);
});
const User = model("User", userSchema);

module.exports = User;
