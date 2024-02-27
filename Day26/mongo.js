const { MongoClient } = require("mongodb");
/////////////////////////////////////////////////////////
//////////////CONNECT TO MONGODB////////////////////////
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));
/////////////////////////////////////////////////////////
  //Create database and collection
  const db = client.db('mydb');
  const collection = db.collection('users');
  // insert an user
  collection
  .insertOne({ name: "Arkadian", age: "25" })
  .then((user) => console.log("User Created Successfully: ", user))
  .catch((error) => console.log("Error: ", error));
  // search for an user with name
  collection
  .findOne({ name: "Arkadian" })
  .then((user) => console.log(user))
  .catch((error) => console.log("Error: ", error));
  // get all users  from database
  collection
  .find().toArray()
  .then((user) => console.log(user))
  .catch((error) => console.log("Error: ", error));
  