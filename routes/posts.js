const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// Many of the routes below are made asynchronous so that we can await the promise returned.
// Route - Gets all the posts
router.get('/', async (req, res) => {
  try{
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({message: err});
  }
});

// Route - Get a specific post
router.get('/:postId', async (req, res) => {
  // req.params allows you to retrieve the ':postId'
  // console.log(req.params.postId);
  // When you want to get data from the database, you have to specify the model name.
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({message: err});
  }
  
});


// Route - Saves a post
router.post('/', async (req, res) => {
  // You won't be able to see the below console log until you parse the body into json.
  // You will need the body-parser package.
  // console.log(req.body);

  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  // .save returns a promise
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({message: err});
  }
});

// Route - delete post
router.delete('/:postId', async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId});
    res.json(removePost);
  } catch (err) {
    res.json({message: err});
  }
});

// Route - Update post
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId},
      { $set: { title: req.body.title}}
      );
    res.json(updatePost);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;