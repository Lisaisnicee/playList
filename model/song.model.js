const { Schema, model, SchemaTypes } = require("mongoose");

const songSchema = new Schema(
  {
    playListId: {
      type: SchemaTypes.ObjectId,
      ref: "playList",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const song = model("song", songSchema);

module.exports = song;
