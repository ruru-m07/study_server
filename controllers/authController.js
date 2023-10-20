const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const connectToMongo = require("../db");
const JWT_SECRET = "ruru";

module.exports = {
  createuser: async (req, res) => {
    let connect = await connectToMongo()
    let success = false;
    // if there are errors, return the bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success, error: error.array() });
    }

    try {
      // check the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "sorry a user with this email is alredy exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user

      user = await User.create({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: secPass,
        image: req.body.image,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
  login: async (req, res) => {
    let connect = await connectToMongo();

    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "please try to login using correct email." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "please try to login using correct password.",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
  whoami: async (req, res) => {
    let connect = await connectToMongo();

    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      // console.log(user);
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  },
  getuserbyid: async (req, res) => {
    let connect = await connectToMongo();

    try {
      let userId = req.params.id;
      const user = await User.findById(userId).select("-password");
      // console.log(user);
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  },
  alluser: async (req, res) => {
    let connect = await connectToMongo();

    try {
      const alluser = await User.find({});
      res.send({ status: "ok", data: alluser });
    } catch (error) {
      console.log(error);
    }
  },
  getalluser: async (req, res, next) => {
    let connect = await connectToMongo();

    // console.log(req.params.id);
    try {
      let user = await User.findById({ _id: req.params.id }).select(
        "-password"
      );
      // console.log(user);
      res.send({ status: "ok", user: user });
    } catch (error) {
      console.log(error);
      res.status(404).send("user not found");
    }
  },
};
