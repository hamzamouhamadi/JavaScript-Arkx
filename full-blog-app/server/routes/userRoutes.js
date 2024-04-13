const express = require("express")

const {register,login,getUser,logout,getAll,updateUser,delteUser} = require('../controllers/userControllers')
const middleware = require('../middleware/localAuth')
const isLogged = middleware.isLogged;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.post('/register',register);
router.post('/login',login);
router.post('/logout',isLogged,logout);
router.put('/update',isLogged,updateUser);
router.get('/profile',isLogged,getUser);
router.delete('/delete',isLogged,delteUser)
router.get('/allUsers',getAll);
///////////////////////////////////////////////////////////////
module.exports = router;