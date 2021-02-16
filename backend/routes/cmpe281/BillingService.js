const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.post("/createBill", (req, res) => {

	var input = req.body;
	var srID = input.request_id;
	var battery_cost = 0.0;
	var distance_cost = 0.0;
	var time_cost = 0.0;
	var totalCost = 0.0;

	db.query(("insert into billing (request_id, totalcost, battery_cost, distance_cost, time_cost) values(?,?)"),[srID, totalCost, battery_cost, distance_cost, time_cost], function(error, results) {
        if (error) throw error;
    })

});

router.put("/updateBill", (req, res) => {

	var input = req.body;
	var srID = input.request_id;
	
	db.query(("select service_id, drone_id, session_time, no_of_sessions from request where request_id = ?"), [srID], function(error, results) {
        if (error) throw error;
        var serviceID = JSON.parse(results).service_id;
        var droneID = JSON.parse(results).drone_id;
        var sessionTime = JSON.parse(results).session_time;
        var numSessions = JSON.parse(results).no_of_sessions;

        console.log("serviceID = " + serviceID);
        console.log("sessionTime = " + sessionTime);

    })

// 	db.query(("select drone_id, basecost from service where service_id = ?"), [serviceID], function(error, results) {
//         if (error) throw error;
//         var droneID = JSON.parse(results).drone_id;
//         var baseCost = JSON.parse(results).basecost;
//         console.log("droneID = " + droneID);
//         console.log("baseCost = " + baseCost);
//     })
    
    db.query(("select * from resource where resource_id='1'"), function(error, results) {
        if (error) throw error;
        var battery_cost = JSON.parse(results).cost * sessionTime;
    })

	db.query(("select * from resource where resource_id='2'"), function(error, results) {
        if (error) throw error;
        var time_cost = JSON.parse(results).cost * sessionTime;
    })
    
    db.query(("select * from resource where resource_id='3'"), function(error, results) {
        if (error) throw error;
        var distance_cost = JSON.parse(results).cost * sessionTime;
    })
    
    

	var totalCost =  battery_cost + time_cost + distance_cost;

	db.query(("update billing set totalcost = ?, battery_cost = ?, time_cost = ?, distance_cost = ? where request_id = ?"),[totalCost, battery_cost, time_cost, distance_cost, srID], function(error, results) {
        if (error) throw error;
    })

});

router.get('/getBillById',(req,res) =>{

    var id = req.request_id;
    console.log("id: " + id);
    db.query(('select * from billing where request_id=?'),[id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.send(JSON.stringify(results));
    })

});

router.get('/getAllBills', (req,res) =>{
    db.query(('SELECT * FROM billing'), function(error,results){
        if(error) throw error;
        // var resultArr = new Array(results.length);
//         for(var i = 0; i < results.length; i++) {
//         	resultArr[i] = new Array(results[i].length)
//         	resultArr[i][0] = results[i]["request_id"];
//         	resultArr[i][1] = results[i]["totalcost"]
//         }
//         console.log("results : " + resultArr.toString());
        res.send(results);
    })
})

router.get('/getUserBills', (req,res) =>{
    db.query(("select * from billing where request_id in (select request_id from request where email = 'sruthi.duvvuri1@gmail.com')"), function(error,results){
        if(error) throw error;
        // var resultArr = new Array(results.length);
//         for(var i = 0; i < results.length; i++) {
//         	resultArr[i] = new Array(results[i].length)
//         	resultArr[i][0] = results[i]["request_id"];
//         	resultArr[i][1] = results[i]["totalcost"]
//         }
//         console.log("results : " + resultArr.toString());
        res.send(results);
    })
})

module.exports = router;
