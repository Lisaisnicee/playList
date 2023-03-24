const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const authentification = async (req, res, next) => {
  try {
    //const auth = req.header.authorization.split('Bearer ')[1]
    const auth = req.headers["authorization"];

    //const auth = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(auth, "foo");
    res.status(200).json({ message: "token valid", decodedToken });
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": auth,
    });

    if (!user) throw new Error();
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("L'authentification a échoué !");
  }
};

module.exports = authentification;
//process.env.TOKEN_SECRET
