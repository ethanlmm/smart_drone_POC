const express = require("express");
const router = express.Router();
// const config = require("../../config/mongoConnection.js");
// const mongoDB=config.mongoDB;
const mongoose = require("mongoose");
// DB config
const mongoURI = require("../../config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(mongoURI, { poolSize: 10 },{ useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected from Mongoose"))
  .catch(err => console.log(err));

//Load Tracking Model
const Tracking = require("../../models/tracking");

    //get Drone Trakcing details by user
    router.post('/getTrackingDetailsByUser',(req,res) =>{
        console.log("Inside tracking api")
        const{user_email} = req.body;
        console.log("user_email is"+user_email);

       let data= [{"drone_id":1,"drone_name":"Phantom RTK","user_email":"sruthi.duvvuri1@gmail.com","description":"Agriculture Drone","speed":50,"altitude":180,"lat":0.99,"long":0.87,"distance":20,"battery":60,"cpu_usage":30,"payload_weight":50,"payload_type":"pesticide"}
                ,{"drone_id":2,"drone_name":"Agras T16","user_email":"sruthi.duvvuri1@gmail.com","description":"Agriculture Drone","speed":70,"altitude":250,"lat":0.99,"long":0.87,"distance":90,"battery":70,"cpu_usage":90,"payload_weight":30,"payload_type":"water"}];
        // Tracking.find({ }).then(result => {
        //     console.log("the result is"+result);
        //     return res.status(200).json(result);
        //               })
        //             .catch(err => console.log(err)); 

        res.status(200).json(data);
    });


module.exports = router;