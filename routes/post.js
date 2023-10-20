const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { createPost, getPost, updatePost, deletePost, likePost, allpost, getuserpost } = require("../controllers/PostController");

router.post("/", fetchuser, createPost);
router.post("/test", (req, res) => {
    console.log("file droped")
    res.status(200).json({"newPost": true});
});
router.get("/:id",fetchuser, getPost);
router.put("/:id", fetchuser, updatePost);
router.delete("/:id", fetchuser, deletePost); 
router.put("/:id/like", fetchuser, likePost);
router.get("/:id/allpost", fetchuser, allpost);
router.get("/:id/getuserpost", fetchuser, getuserpost);

module.exports = router;
