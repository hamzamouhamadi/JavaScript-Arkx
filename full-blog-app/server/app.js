const express = require("express");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandling = require("./middleware/errorHandling");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes")
const middleware = require('./middleware/localAuth')
const connectDB = require("./config/db")
const flash = require('connect-flash')

///////////////////////////////////////////////////////////////
connectDB();
const app = middleware.app;
app.use(express.json());
///////////////////////////////////////////////////////////////
//app.use(sessionMiddleware);
app.use(loggingMiddleware);
///////////////////////////////////////////////////////////////
app.use(errorHandling);
app.use('/api/posts',postRoutes);
app.use(userRoutes);
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
app.listen(process.env.PORT, ()=>console.log(`Your server listening to the ${process.env.PORT}`));



