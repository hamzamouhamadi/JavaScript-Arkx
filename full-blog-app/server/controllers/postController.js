const Post = require('../model/poste.model')
const cloudinary = require("../utils/cloudinary")
//////////////////////////////////////////////////////
const getPosts = async (req,res)=>{

  try {
    let posts = await Post.find()
    //res.status(200).json(posts);
    //console.log('user req',req.user._id);
    if(req.user){
        res.send({data : posts, user: req.user})
    }else{
        res.status(200).json(posts);
    }
  } catch (error) {
    res.sendStatus(402).json({message : "Problem with fetching posts"})
  }
}
const getMyPosts = async(req,res)=>{
    //const id =req.user._id
    try {
        let posts = await Post.find({authorId: req.user._id})
        //console.log(req.user);
        res.status(201).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred while fetching posts"});
    }
}


const UserPosts = async(req,res)=>{
    const id =req.params.id
    try {
        let posts = await Post.find({authorId: id})
        res.status(201).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred while fetching posts"});
    }
}

//////////////////////////////////////////////////////
const findPost = async(req,res)=>{
    const id =  req.params.id;
    let post=  await Post.find({_id : id});
    if(post){ 
        res.json(post)
    }else{
        res.status(404).send("Post not found")
    }
}
//////////////////////////////////////////////////////
const addPost = async (req,res)=>{
    let {title,category,content,image} =req.body
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let post = await Post.create({
            title : title,
            category : category,
            content : content,
            image:{
                publicId : result.public_id,
                url : result.secure_url
            },
            authorId: req.user._id
        })
        //console.log(req.user._id);
        res.send(post)
    } catch (error) {
        res.status(406).send("Problem with adding your post")
    }
}
//////////////////////////////////////////////////////
const updatePost = async (req,res)=>{
    const id = req.params.id;
    let {title,content,category} =req.body
    try {
        const post = await Post.updateOne({_id : id},{
            title : title,
            content : content,
            category : category
        });
        res.status(201).send('The Blog has been updated');
    } catch (error) {
        res.status(402).send(error.message);
    }
    
}
//////////////////////////////////////////////////////
const deletePost = async(req,res)=>{
    const id =  req.params.id;
    let post=  await Post.deleteOne({_id : id});
    if(post){ 
        res.json(post)
    }else{
        res.status(404).send("Post not found")
    }
    
}
//////////////////////////////////////////////////////
module.exports = {
    getPosts,
    addPost,
    findPost,
    updatePost,
    deletePost,
    getMyPosts,
    UserPosts
}