const router = require("express").Router();
const PlayList = require("../model/playList.model");
const Song = require("../model/song.model");
const User = require("../model/user.model");

router.post("/lists", async (req, res, next) => {
  try {
    const createdPlayList = await PlayList.create(req.body);
    const saveAns = await createdPlayList.save();
    res.status(201).json(saveAns);
  } catch (error) {
    next(error);
  }
});

router.get("/lists", async (req, res, next) => {
  try {
    const playLists = await PlayList.find();
    res.status(200).json({ message: "playLists trouvées", data: playLists });
  } catch (err) {
    next(err);
  }
});

router.get("/:playListId", async (req, res, next) => {
  const id = req.params.playListId;
  console.log("route playlistID", req.params);
  try {
    const playList = await PlayList.findById(id);
    console.log("playlist : ", playList);
    if (!playList) {
      return res.status(404).json({ message: "Aucune playListe trouvée" });
    }
    res.status(200).json({ message: "playList trouvée", data: playList });
  } catch (err) {
    next(err);
  }
});

router.patch("/:playListId", async (req, res, next) => {
  const playlistId = req.params.playListId;

  try {
    const playlist = await PlayList.findByIdAndUpdate(playlistId, req.body, { new: true });

    if (!playlist) {
      return res
        .status(404)
        .json({ message: "Aucune playlist trouvée à update" });
    }

    const user = await User.findOneAndUpdate(
      { _id: playlist.userId },
      { $addToSet: { playlists: playlist._id } },
      { new: true }
    );

    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

router.delete("/:playListId", async (req, res, next) => {
  const playlistId = req.params.playListId;

  try {
    const playList = await PlayList.findByIdAndDelete(playlistId);
    await Song.deleteMany({ playListId: playList._id });

    if (!playList) {
      return res.status(404).json({
        message: "La playlist que vous recherchez à supprimer est introuvable",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
