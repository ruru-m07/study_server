const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const { followUser, unfollowUser } = require("../controllers/UserController");
const { createuser, login, getuserbyid, alluser, whoami, getalluser } = require("../controllers/authController");

router.post(
  "/createuser",
  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "Password should be of length 8").isLength({ min: 8 }),
  createuser
);
router.post(
  "/login",
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password can not be blank").exists(),
  login
);
router.get("/whoami", fetchuser, whoami);
router.get("/getuserbyid/:id", fetchuser, getuserbyid);
router.get("/alluser", fetchuser, alluser);
router.get("/getalluser/:id", fetchuser, getalluser);
router.put("/:id/follow", fetchuser, followUser);
router.put("/:id/unfollow", fetchuser, unfollowUser);

module.exports = router;
