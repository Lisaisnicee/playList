const Song = require("../model/song.model");

const isSongInDB = async (req, res, next) => {
  try {
    const foundSongById = await Song.findById(req.params.songId);
    console.log(foundSongById);
    if (!foundSongById) throw new Error();
      

    next();
  } catch (error) {
    return res.status(404).json({ message: "Song not found" });
  }
};

module.exports = isSongInDB;
