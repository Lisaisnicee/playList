const { Schema, model, SchemaTypes } = require("mongoose");

const playListSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },

    songs: [
      {
        type: SchemaTypes.ObjectId,
        ref: "song",
      },
    ],
  },
  { timestamps: true }
);

const playList = model("playList", playListSchema);

module.exports = playList;
