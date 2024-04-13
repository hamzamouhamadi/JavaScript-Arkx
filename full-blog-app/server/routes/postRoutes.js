const express = require("express")
const {getPosts,addPost,findPost,updatePost,deletePost,getMyPosts,UserPosts} = require("../controllers/postController")
const middleware = require('../middleware/localAuth');
const upload = require("../utils/mlter")

const isLogged = middleware.isLogged;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.get('/posts',getPosts);
router.post('/addPost',upload.single('image'),isLogged,addPost);
router.get('/myPosts',isLogged, getMyPosts) 
router.get('/:id',findPost);
router.put('/update/:id',isLogged,updatePost);
router.delete('/delete/:id',isLogged,deletePost);
router.get('/UserPosts/:id',UserPosts)
///////////////////////////////////////////////////////////////
module.exports = router;