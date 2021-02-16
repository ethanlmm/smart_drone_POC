const { response } = require("express");
const express = require("express");
const router = express.Router();
var passwordHash = require("password-hash");
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get("/test", (req, res) => res.json({ msg: "backend connection works" }));

// user register and login api
router.post("/register", (req, res) => {
  console.log("Inside register api");
  var email = req.body.email;
  var uid = req.body.uid;
  var password = req.body.password;
  var displayName= req.body.displayName;
  var usertype;
  if(email.substring(email.indexOf('@')+1)=="sjsu.edu"){
      usertype ="admin";
  }
  else{
      usertype="customer";
  }
  console.log("user details:  " +uid,displayName,email,password,usertype);

  db.query ('select * from user where email =? and uid=?', [email,uid], function(error, results){
    if (results.length>0){
      console.log(results[0]);
      console.log("User already exists");
      res.send({email,displayName,usertype});
       
    }
    else{
      console.log("insert the user record");
           db.query('INSERT INTO user (uid,displayName,email,password,usertype) VALUES (?,?,?,?,?)',[uid,displayName,email,password,usertype],
          function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.send({email,displayName,usertype});
          }
        );
    }
    });
    });

    // update account
    router.post("/updateAccount", (req,res) =>{
      console.log("update account api");
      console.log("data is "+req.body);
      const{email,address1,address2,city,stateName,zip}=req.body;
      try{
        db.query('update user set address1=?,address2=?,city=?,stateName=?,zip=? where email=?',
        [address1,address2,city,stateName,zip,email],
        function(error,result){
          if(error) throw error;
        });
      }
        catch(error){
          console.log("Error Occured: "+error);
        }
      res.status(200).json(200);
    });

    //Get User Details
    router.post("/getUserDetails", (req,res)=>{
      const email =req.body.email;
      try{
        db.query('select * from user where email=?'
        ,[email],function(error,result){
            if(error) throw error;
            res.status(200).json(result[0]);
        });  
    }
    catch(error){
        console.log("Error occured: "+error);
    }
    });


    router.post('/bookDrone', (req, res) =>{
      const{drone_id,user_email,service_id,service_basecost
          ,service_date,session_time,
          no_of_sessions,service_totalcost} = req.body;
      try{
          db.query('insert into request (drone_id,email,service_id,service_basecost,service_date,session_time,no_of_sessions,service_totalcost) values (?,?,?,?,?,?,?,?)'
          ,[drone_id,user_email,service_id,service_basecost,service_date,session_time,no_of_sessions,service_totalcost],function(error,result){
              if(error) throw error;
          });  
      }
      catch(error){
          console.log("Error occured: "+error);
      }
      res.status(200).json({ success:true,drone_id:drone_id,service_id:service_id});
      
      });


module.exports = router;
