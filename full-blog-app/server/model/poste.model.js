const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title :{type : String , required : true},
    category : {type : String , required : true},
    content :{type : String , required : true},
    authorId :{type : mongoose.Schema.Types.ObjectId ,ref : 'User'},
    authorName: { type: String },
    publicationDate : {
        type: String,
    default: () => {
      const now = new Date(Date.now());
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      function pad(n) {
          return n < 10 ? '0' + n : n;
      }

      return `${year}-${pad(month)}-${pad(day)}`;
    }
    },
    lastModified : {
        type: String,
    default: () => {
      const now = new Date(Date.now());
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Add 1 because getMonth() is zero-based
      const day = now.getDate();

      function pad(n) {
          return n < 10 ? '0' + n : n;
      }

      return `${year}-${pad(month)}-${pad(day)}`;
    }
    },
    image:{
        publicId : String,
        url :String
    }
    //views : {},
    //likes :{},
    //comments :{}
})
PostSchema.pre('find', function(next) {
    this.populate('authorId', 'username -_id'); // Assuming the username field is used for the author's name
    next();
});
const Post = mongoose.model(  "Post" , PostSchema)

module.exports = Post