const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;


router.get('/getServicesByDroneId',(req,res) =>{

    var id = req.query.id;
    console.log("id: " + id);
    db.query(('select * from service where drone_id=? and servicestatus="active"'),[id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })

});

router.post('/createagricultureservice',(req,res) =>{
    var agriservice = {};
    agriservice = req.body;
    db.query(('insert into service set ?'),agriservice, function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.put('/updateagricultureservice',(req,res) =>{
    var agriservice = {};
    agriservice = req.body;
    db.query(('UPDATE service SET name=?,basecost=?,description=?,servicetype=? where service_id = ?'),[agriservice.name,agriservice.basecost,agriservice.description,agriservice.servicetype,agriservice.id],function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.put('/removeagricultureservice',(req,res) =>{

    var body = req.body;
    console.log("id: " + body.id);

    db.query(('update service set servicestatus="inactive" where service_id=?'),[body.id], function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});


module.exports = router;
