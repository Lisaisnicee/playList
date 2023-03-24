const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const authentification = require("../middlewares/authentification");
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
  } catch (error) {
    
  }
});

router.get("/users/me", authentification, async (req, res, next) => {
  res.status(200).json(req.user);
});

router.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    res.send(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    //const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucune chanson trouvée à update" });
    }
    //res.send(playList);
    res.json(user);
  } catch (err) {
    next(err);
    console.error(err.message);
    res.status(500).send(err);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "L'utilisateur que vous cherchez à supprimer est introuvable",
      });
    }

    res.status(204).send();
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
