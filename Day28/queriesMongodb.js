const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/ArkxDb')
    .then(()=>console.log("Connected to ArkxDb with successfully"))
    .catch((err)=>console.log(err))

const ProductSchema  = new mongoose.Schema({
    name : {type : String , required : true},
    price : {type : Number , required : true , "minimum": 0},
    description : {type : String, required : true },
    inStock :{type : Boolean},
    category : {type : String},
    createdAt  : {type : Date , default:Date.now()}
})

const Product = mongoose.model( 'Product', ProductSchema );

// Insert Products
const product = Product.create([
    {
      name: 'Laptop',
      price: 1200,
      description: 'High-performance laptop with powerful specs.',
      category : 'laptop',
      inStock: true,
    },
    {
      name: 'Smartphone',
      price: 800,
      description: 'Latest smartphone with advanced features.',
      category : 'phone',
      inStock: true,
    },
    {
      name: 'HP',
      price: 800,
      description: 'Latest laptop with advanced features.',
      category : 'laptop',
      inStock: true,
    },
    {
      name: 'Iphone Xr',
      price: 800,
      description: 'Latest Iphone with advanced features.',
      category : 'phone',
      inStock: true,
    }
  ])
  .then((data)=>{console.log("Users Created with successfully",data);})
  .catch(err=>{console.log(err)});


  //Sort descending 
  Product.find({}).sort({"price" :1})
    .then((data)=>console.log('Data sorted', data))
    .catch(error => console.log(error));

//Pagination with limit
    Product.find({}).limit(5)
    .then((data)=>console.log('The first five products using pagination', data))
    .catch(error => console.log(error));

//Pagination with limit and skip 
const pageSize = 2;
const pageNumber = 4;

Product.find({})
.skip(pageNumber)
.limit(pageSize)
.then((users) => {
  console.log(users);
})
.catch(error => console.log(error));

//
//Aggregation - Count Products in Stock
Product.aggregate([{$match : {inStock : true}},{$group : {_id : "", Total : {$sum : 1}}}])
.then((users) => {
  console.log(users);
})
.catch(error => console.log(error));

//  Average Price
Product.aggregate([{$group : {_id : "" , AVERAGE : { $avg : "$price" }}}])
.then((users) => {
  console.log(users);
})
.catch(error => console.log(error));

//Sorting Products by Name

Product.aggregate([{$sort : {"name" : 1}}])
.then((users) => {
  console.log(users);
})
.catch(error => console.log(error));

//Pagination with aggregate

const dynamicPageSize = 4

Product.aggregate([{$limit : dynamicPageSize}])
.then((users) => {
  console.log(users);
})
.catch(error => console.log(error));


// Group By Category
  Product.aggregate([{$group : {_id : "$category",products: { $push: "$$ROOT" }}}])
  .then((users) => {
    console.log(users);
  })
  .catch(error => console.log(error));


module.exports = Product;