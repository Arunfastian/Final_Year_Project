const express = require("express");
const { body, validationResult, check } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("Jsonwebtoken");
const checkToken = require("./checkToken");
const dotenv = require("dotenv");

dotenv.config();

require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const User = mongoose.model("user");

router.post(
  "/SignUp",
  [
    body("firstName", "Enter Valid fName").isLength({ min: 1 }),
    body("lastName", "Enter valid lastName").isLength({ min: 1 }),
    body("email", "Enter valid email").isLength({ min: 1 }),
    body("password", "Enter valid password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ status: -1, errors: errors.array() });
      } else {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(404).json({ status: 1 });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          age: req.body.age,
        });
        const savedUser = await user.save();
        res.json({ status: 0, data: savedUser });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/Login",
  [
    body("email", "Enter valid email").isLength({ min: 1 }),
    body("password", "Enter valid password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(404).json({ status: -1, errors: errors.array() });

      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ status: 1 });
      const passCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passCorrect) return res.status(400).json({ status: 1 });

      const token = JWT.sign({ _id: user._id }, JWT_SECRET);
      res
        .header("auth-token", token)
        .json({
          status: 0,
          Token: token,
          User: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
          },
        });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

module.exports = router;
