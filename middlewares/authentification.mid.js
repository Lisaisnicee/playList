const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const authentification = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    const decodedToken = jwt.verify(auth, "123456789");
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": auth,
    });
    res.status(200).json(user);
    if (!user) throw new Error();

    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("L'authentification a échoué !");
  }
};

module.exports = authentification;
