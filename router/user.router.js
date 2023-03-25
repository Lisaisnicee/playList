const router = require("express").Router();
const User = require("../model/user.model");
const PlayList = require("../model/playList.model");
const Song = require("../model/song.model");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const authentification = require("../middlewares/authentification.mid");
const { required } = require("nodemon/lib/config");
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/signup", async (req, res, next) => {
  try {
    if (!("email" in req.body && "password" in req.body)) {
      return res.status(422).json({ message: "need an email and password" });
    }
    const ans = await User.create(req.body);
    const saveAns = await ans.save();
    res.status(201).json(saveAns);
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {}
});

router.get("/users/me", authentification, async (req, res, next) => {
  res.status(200).json(req.user);
});

router.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "Désolé, l'utilisateur que vous recherchez n'existe pas.",
      });
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  const playlists = req.body.playlists;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucune playlist trouvée à update" });
    }

    if (playlists) {
      const playlistIds = Array.isArray(playlists) ? playlists : [playlists];
      for (let i = 0; i < playlistIds.length; i++) {
        const playlistId = playlistIds[i];
        await PlayList.findByIdAndUpdate(playlistId, { userId: user });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({
        message: "L'utilisateur que vous essayez de supprimer n'existe pas.",
      });
      return;
    }

    const playlists = await PlayList.find({ userId: user._id });
    for (const playlist of playlists) {
      await Song.deleteMany({ playListId: playlist._id });
      await PlayList.findByIdAndDelete(playlist._id);
    }

    res.status(204).json({
      message:
        "L'utilisateur a été supprimé, ainsi que toutes les playlists qu'il a pu créer",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    if (!("email" in req.body && "password" in req.body)) {
      return res
        .status(422)
        .json({ message: "need 2 keys : email and password" });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(409).json({ message: "wrong email or password" });
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return res.status(409).json({ message: "wrong email or password" });
    }

    const authToken = await foundUser.generateAuthToken();
    res.send({ foundUser, authToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
