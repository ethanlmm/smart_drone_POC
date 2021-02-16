const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/previousOrders/:id', (req,res) =>{
    db.query(('SELECT * FROM request WHERE email=? ORDER BY service_date DESC'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getServiceDetails/:id', (req,res) =>{
    db.query(('SELECT * FROM service WHERE service_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllServices', (req,res) =>{
    db.query(('SELECT * FROM service'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllUsers', (req,res) =>{
    db.query(('SELECT * FROM user WHERE usertype="customer"'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllRequests', (req,res) =>{
    db.query(('SELECT * FROM request'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllDrones', (req,res) =>{
    db.query(('SELECT * FROM drone WHERE status="active"'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllDronesLiveData', (req,res) =>{
    let data= [{"drone_id":1,"drone_name":"Phantom RTK","user_email":"sruthi.duvvuri1@gmail.com","description":"Agriculture Drone","speed":50,"altitude":180,"lat":37.33,"long":-121.88,"distance":20,"battery":60,"cpu_usage":30,"payload_weight":50,"payload_type":"pesticide"}
                ,{"drone_id":2,"drone_name":"Agras T16","user_email":"sruthi.duvvuri1@gmail.com","description":"Agriculture Drone","speed":70,"altitude":250,"lat":37.44,"long":-121.88,"distance":90,"battery":70,"cpu_usage":90,"payload_weight":30,"payload_type":"water"}];
    res.end(JSON.stringify(data));
})

module.exports = router;