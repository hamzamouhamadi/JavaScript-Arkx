const express = require("express")
const {getPosts,addPost,findPost,updatePost,deletePost} = require("../controllers/postController")

const router = express.Router();
///////////////////////////////////////////////////////////////
router.get('/posts',getPosts);
router.post('/posts',addPost);
router.get('/posts/:id',findPost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost);
///////////////////////////////////////////////////////////////
module.exports = router;