const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;


    // BOOKING REQUEST FOR A DRONE SERVICE
    router.post('/bookDrone', (req, res) =>{
        const{drone_id,user_email,service_id,service_basecost
            ,service_startdate,service_enddate,session_time,
            no_of_sessions,service_totalcost,address1,address2,city,stateName,zip} = req.body;
        //console.log("service details: "+JSON.stringify(req.body));
        try{
            db.query('insert into request (drone_id,email,service_id,service_basecost,service_date,service_startdate,service_enddate,session_time,no_of_sessions,service_totalcost,address1,address2,city,stateName,zip) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
            ,[drone_id,user_email,service_id,service_basecost,service_startdate,service_startdate,service_enddate,session_time,no_of_sessions,service_totalcost,address1,address2,city,stateName,zip],function(error,result){
                if(error) throw error;
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
        }
        res.status(200).json({ success:true,drone_id:drone_id,service_id:service_id});
        
        });

    
    // Update Booking Request
    router.post('/updateBooking', (req, res) =>{
        const{request_id,service_startdate,service_enddate,session_time,
            no_of_sessions,service_totalcost,address1,address2,city,stateName,zip} = req.body;
       // console.log("service details: "+JSON.stringify(req.body));
        try{
            db.query('update request set service_startdate=?,service_enddate=?,session_time=?,no_of_sessions=?,service_totalcost=?,address1=?,address2=?,city=?,stateName=?,zip=? where request_id=?',
            [service_startdate,service_enddate,session_time,no_of_sessions,service_totalcost,address1,address2,city,stateName,zip,request_id],function(error,result){
                if(error) throw error;
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
        }
        res.status(200).json(200);
        
        });

       // Cancel Booking Request
       router.post('/cancelBooking', (req, res) =>{
        const request_id= req.body.request_id;
       // console.log("service details: "+JSON.stringify(req.body));
        try{
            db.query('update request set request_status="Cancelled" where request_id=?',
            [request_id],function(error,result){
                if(error) throw error;
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
        }
        res.status(200).json(200);
        
        });

    //GET ALL THE SERVICE REQUESTS PLACED BY ALL USER TO DISPLAY AT ADMIN SIDE
    router.get('/getServiceRequests',(req,res) =>{
        try{
        db.query('select  r.request_id request_id,u.displayName userName,d.name droneName,d.status droneStatus,s.name serviceName,r.service_date serviceDate,r.service_startdate service_startdate,r.service_enddate service_enddate,r.session_time serviceTime,r.no_of_sessions serviceSessionNumber,r.service_totalcost serviceTotalCost,r.request_status request_status from cmpe281.request r join cmpe281.drone d on r.drone_id=d.drone_id join cmpe281.service s on r.service_id=s.service_id join cmpe281.user u on r.email=u.email order by r.request_id desc'
        ,["Approved","Rejected"]
        ,function(error,results){
            if(error) throw error;
            res.status(200).json(results);
        });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        } 
        });

    // ADMIN APPROVES A SERVICE REQUEST
    router.post('/approveServiceRequest', (req, res) =>{
        const {serviceRequestId,pilot_assigned}= req.body;
        console.log("enters into approve request api and servicerequestid is"+JSON.stringify(req.body));
        try{
            db.query('update request set request_status=?,pilot_assigned=? where request_id=?'
            ,["Approved",pilot_assigned,serviceRequestId],function(error,result){
                if(error) throw error;
                res.status(200).json({status:"Booking Request is Approved"});
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        }
        
        });

    // ADMIN REJECTS A SERVICE REQUEST
    router.post('/rejectServiceRequest', (req, res) =>{
        const {serviceRequestId}= req.body;
        try{
            db.query('update request set request_status=? where request_id=?'
            ,["Rejected",serviceRequestId],function(error,result){
                if(error) throw error;
                res.status(200).json({status:"Booking Request is Rejected"});
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        
        }     
        });


module.exports = router;
