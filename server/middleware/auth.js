const jwt = require("jsonwebtoken");
const secretKey = "S3cr#tK3y";

const authenticatejwt = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.sendStatus(500).json({ message: "verification error." });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(500).json({ message: "auth token not reached" });
  }
};

module.exports = {
  authenticatejwt,
  secretKey,
};
