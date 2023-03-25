const router = require("express").Router();
const Song = require("../model/song.model");
const PlayList = require("../model/playList.model");
const isSongInDB = require("../middlewares/isSongInDB");
router.post("/", async (req, res, next) => {
  try {
    const createdSong = await Song.create(req.body);
    const saveAns = await createdSong.save();
    res.status(201).json(saveAns);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ message: "Chansons trouvées", data: songs });
  } catch (err) {
    next(err);
  }
});

router.get("/:songId", isSongInDB, async (req, res, next) => {
  const id = req.params.songId;
  console.log("route songId", req.params);
  try {
    const song = await Song.findById(id);
    console.log("song : ", song);
    if (!song) {
      return res.status(404).json({ message: "Aucune chanson trouvée" });
    }
    res.status(200).json({ message: "chanson trouvée", data: song });
  } catch (err) {
    next(err);
  }
});



router.patch("/:songId", async (req, res, next) => {
  const songId = req.params.songId;

  try {
    const song = await Song.findByIdAndUpdate(songId, req.body, { new: true });

    if (!song) {
      return res
        .status(404)
        .json({ message: "Aucune chanson trouvée à update" });
    }

    
    const playList = await PlayList.findOneAndUpdate(
      { _id: song.playListId },
      { $addToSet: { songs: song._id } },
      { new: true }
    );

    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});





router.delete("/:songId", async (req, res, next) => {
  const songId = req.params.songId;

  try {
    const song = await Song.findByIdAndDelete(songId);

    if (!song) {
      return res.status(404).json({
        message: "La chanson que vous cherchez à supprimer est introuvable",
      });
    }

    

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
