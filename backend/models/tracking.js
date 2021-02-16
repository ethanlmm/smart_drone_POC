const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TrackingSchema = new Schema({
   drone_id: {
    type: Number,
    required: true
  },
   drone_name: {
    type: String,
    required: false
  },
  user_email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  speed: {
    type: String,
    required: false
  },
  altitude: {
    type: String,
    required: false
    },
   lat:{
    type: String,
    required: false  
   },
   long:{
    type: String,
   required: false  
   },
   distance:{
    type: String,
    required: false   
   },
   battery:{
    type: String,
    required: false   
   },
   cpu_usage:{
    type: String,
    required: false   
   },
   payload_weight:{
    type: String,
    required: false   
   },
   payload_type:{
    type: String,
    required: false   
   }
});

module.exports = Tracking = mongoose.model("tracking", TrackingSchema);
