const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
  // implement registration
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        const token = makeJwt(user);

        res.status(201).json({ data: user, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and an alphanumeric password",
    });
  }
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);

          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and alphanumeric password",
    });
  }
});

function makeJwt({ id, username }) {
  const payload = {
    username,
    subject: id,
  };
  const config = {
    jwtSecret: process.env.JWT_SECRET || "is it secret? is it safe?",
  };
  const options = {
    expiresIn: "8 hours",
  };

  return jwt.sign(payload, config.jwtSecret, options);
}


module.exports = router;
