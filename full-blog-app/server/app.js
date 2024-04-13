require('dotenv').config();
const express = require("express");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandling = require("./middleware/errorHandling");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes")
const middleware = require('./middleware/localAuth')
const connectDB = require("./config/db")
const flash = require('connect-flash')
const cors = require("cors");
 const cookieParser = require("cookie-parser");
 const bodyParser = require("body-parser")

///////////////////////////////////////////////////////////////
// Corrected middleware order and session configuration
connectDB();
const app = middleware.app;
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true,
    methods : ["GET","POST", "PUT", "DELETE"],
    allowedHeaders :[ "Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(flash());
app.use(express.json());
    
app.use(loggingMiddleware);
app.use(errorHandling);

app.use('/post',postRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => console.log(`Your server listening to the ${process.env.PORT}`));




