const mongoose = require('mongoose');
// COnnect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

// Create Schema 
const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    age : {type : Number , required : true},
    createdAt :{ type : Date, 'default' : Date.now()}
})

const User = mongoose.model('User', userSchema);

//Creating a new user 
const newUser = new User({
    name: "Mike",
    email: "mike.rs@arkx.group",
    age: 30,
  });
  newUser
    .save()
    .then((user) => console.log("User created succesfully: ", user))
    .catch((error) => console.log("Error creating user: ", error));

//Fetching users
    function getAll() {
        User.find({})
        .then((users) => console.log(users))
        .catch((error) => console.log("Error fetching users: ", error));
    }
    getAll();
//Finding a user
    function findBy(name,email) {
        User.findOne([{ name:name },{ email:email}])
        .then((user) => {
          if (user) console.log(user);
          else console.log("User not found");
        })
        .catch((error) => console.log("Error fetching users: ", error));
    }
    findBy("Mike", "mike.ross@arkx.group")
//Updating a user
    function UpdateUser(newMail) {
        User.findOneAndUpdate(
            { name: "Mike Ross" },
            { $set: { email: newMail, age: 20 } }
          )
            .then((user) => {
              if (user) console.log("User updated successfully: ", user);
              else console.log("User not found");
            })
            .catch((error) => console.log("Error fetching users: ", error));
    }
    UpdateUser("user@arkx.group");

//Deleting a user
        function deleteUser() {
            User.deleteMany({ createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } })
            .then((user) => {
            if (user) console.log("User deleted successfully: ", user.deletedCount);
            else console.log("User not found");
            })
            .catch((error) => console.log("Error deleting user: ", error));
        }
        deleteUser();

//FINICIONSS