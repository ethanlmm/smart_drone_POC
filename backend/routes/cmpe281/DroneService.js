const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//const S3_BUCKET = process.env.AWS_BUCKET_NAME;
//const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
//const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
//const AWS_REGION = process.env.AWS_REGION;
const db=config.db;


const upload  = multer({ storage: multer.memoryStorage() });


const s3 = new aws.S3({
    secretAccessKey: 'cOff+IX4RmOP5f1kBDAVXMj/ABOemsOn8H6HUq0I' ,
    accessKeyId: 'AKIAIFS5P3LLFSL5KOUQ',
    region: 'us-west-1'
});



router.get('/', (req, res) =>{
    db.query(("select * from drone where status='active'"), function(error,results){
        if(error)
        throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
});

router.get('/getDroneById',(req,res) =>{

    var id = req.query.id;
    console.log("id: " + id);
    db.query(('select * from drone where drone_id=?'),[id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })

});

const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'cmpe281bucket',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname)
      }
    })
    
  });

router.post('/createdrone',uploadS3.single('image'),(req,res) =>{

    var drone = {};
    drone = req.body;
    if(req.file != undefined || req.file != null) {
        drone.image = JSON.stringify(req.file.location);
    }
   
   // console.log("req.file" + JSON.stringify(req.file.location));
   // console.log("image: " + drone.file.image);
   // const file = drone.files.image;
    
   db.query(('insert into drone set ?'),drone, function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

/*
// rename a file
const renameImage = file => md5(Date.now()) + '.' + file.name.replace(/ /g, '-').split('.').pop()

// Upload your image to S3
const uploadToS3 = (file,res) => {
    
    s3.createBucket( () => {
        var params = {
          Bucket: S3_BUCKET,
          Key: renameImage(file),
          Body: file.data
        };
        s3.upload(params, (err, data) => {
          if (err) {
            console.log(err.message);
            res.status(422).send(err);
          }
          // return the S3's path to the image
          res.json(data.Location);
        });
    });
  }*/

router.put('/updatedrone',uploadS3.single('image'),(req,res) =>{
    var drone = {};
    drone = req.body;

    //console.log("req file : " + req.file);

    console.log("image from frontend : " + drone.imageUrl);
    if(req.file != undefined || req.file != null) {
        drone.image = JSON.stringify(req.file.location);
    } else {

        drone.image = drone.imageUrl;
    }

    db.query(('UPDATE drone SET name=?,size=?,type=?,description=?,hardwarespecs =?,softwarespecs=?,image=?,wingspan=?, weight=?,battery=?,camera=?,flighttime=?,flightrange=?,flightaltitude=?,flightspeed=?,flightplanningsoftware=?,imagesoftware=?,powerconsumption=? where drone_id = ?'),[drone.name,drone.size,drone.type,drone.description,drone.hardwarespecs,drone.softwarespecs,drone.image,drone.wingspan,drone.weight,drone.battery,drone.camera,drone.flighttime,drone.flightrange,drone.flightaltitude,drone.flightspeed,drone.flightplanningsoftware,drone.imagesoftware,drone.powerconsumption,drone.id],function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.put('/removedrone',(req,res) =>{

    var body = req.body;
    console.log("id: " + body.id);

    db.query(('update drone set status="inactive" where drone_id=?'),[body.id], function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.get('/searchdrones',(req,res) =>{
    console.log("hello tues");

    var name = req.query.name;
    var description = req.query.description;
    


        var conditions = [];
        var values = [];
      
        if (typeof req.query.name !== 'undefined') {
          conditions.push("name LIKE ?");
          values.push("%" + req.query.name + "%");
        }
      
        if (typeof req.query.description !== 'undefined') {
          conditions.push("description LIKE ?");
          values.push("%" + req.query.description + "%");
        }

        if (typeof req.query.type !== 'undefined') {
          conditions.push("type LIKE ?");
          values.push("%" + req.query.type + "%");
        }
        
        conditions.push("status = ?");
        values.push('active');

        var conditions = {
          where: conditions.length ?
                   conditions.join(' AND ') : '1',
          values: values
        };

      
      //var conditions = buildConditions(params);
      var sql = 'SELECT * FROM drone WHERE ' + conditions.where;

      console.log("sql query: " +sql);

      console.log("values: " + values);
      
      db.query(sql, conditions.values, function(error, results) {
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
      });
    
    //db.query(('select * from drone'),[name], function(error,results){
       
    


});




module.exports = router;
