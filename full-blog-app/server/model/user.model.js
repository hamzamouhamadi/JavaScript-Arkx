const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {type : String , required : true},
    email :{type : String , required : true, unique : true},
    password :{type : String , required : true},
    bio : {type : String},
    registration_Date :{ type :Date , default : Date.now()},
    //Posts :[{type : mongoose.Schema.Types.ObjectId ,ref : 'Post'}]
})


const User = mongoose.model( "User", userSchema );

module.exports = User ;

