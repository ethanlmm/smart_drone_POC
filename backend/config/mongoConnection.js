const mongoose = require("mongoose");

// DB config
const mongoURI = require("./keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { poolSize: 10 })
  .then(() => console.log("MongoDB Connected from Mongoose"))
  .catch(err => console.log(err));

//   module.exports= { mongoDB : mongoose
//     .connect(mongoURI, { poolSize: 10 })
//     .then(() => console.log("MongoDB Connected from Mongoose"))
//     .catch(err => console.log(err))
//   };