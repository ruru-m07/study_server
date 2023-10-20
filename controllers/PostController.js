const Post = require("../models/Post.js");
// creating a post
module.exports = {
  createPost: async (req, res) => {
    const { title, description, tag, image } = req.body;
    const newPost = new Post({
      title,
      description,
      tag,
      image,
      user: req.user.id,
    });

    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // get a post
  // the id say the post id
  getPost: async (req, res) => {
    const id = req.params.id;

    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // update post
  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
      const post = await Post.findById(postId);
      console.log("post user", post.user);
      console.log("curent user", req.user.id);
      console.log(req.user.id === post.user);
      if (post.user === req.user.id) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post updated!");
      } else {
        res.status(403).json("Authentication failed");
      }
    } catch (error) {}
  },

  // delete a post
  deletePost: async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
      const post = await Post.findById(id);
      if (post.user === req.user.id) {
        await post.deleteOne();
        res.status(200).json("Post deleted.");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // like/dislike a post
  likePost: async (req, res) => {
    const id = req.params.id;
    const { userId } = req.user.id;
    try {
      const post = await Post.findById(id);
      if (post.likes.includes(req.user.id)) {
        await post.updateOne({ $pull: { likes: req.user.id } });
        res.status(200).json("Post disliked");
      } else {
        await post.updateOne({ $push: { likes: req.user.id } });
        res.status(200).json("Post liked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  allpost: async (req, res) => {
    try {
      const post = await Post.find();
      console.log(post);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getuserpost: async (req, res) => {
    try {
      const post = await Post.find({ user: req.user.id });
      // res.json(Post);
      res.send(post);
    } catch (error) {
      console.error(error.message);
    }
  },

  // Get timeline posts
  // getTimelinePosts: async (req, res) => {
  //   const userId = req.params.id;
  //   try {
  //     const currentUserPosts = await PostModel.find({ userId: userId });

  //     const followingPosts = await UserModel.aggregate([
  //       {
  //         $match: {
  //           _id: new mongoose.Types.ObjectId(userId),
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "posts",
  //           localField: "following",
  //           foreignField: "userId",
  //           as: "followingPosts",
  //         },
  //       },
  //       {
  //         $project: {
  //           followingPosts: 1,
  //           _id: 0,
  //         },
  //       },
  //     ]);

  //     res.status(200).json(
  //       currentUserPosts
  //         .concat(...followingPosts[0].followingPosts)
  //         .sort((a, b) => {
  //           return new Date(b.createdAt) - new Date(a.createdAt);
  //         })
  //     );
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
};
