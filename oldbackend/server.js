const express=require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const multer = require('multer');
const md5 =require('md5')

const Sequelize= require('sequelize')
const config = require('./config/config.json')
const seq= new Sequelize(config["224-3306"])
var fileupload = require("express-fileupload");


//const slaveGen = require('child_process')
//const backend = slaveGen.fork('slave')
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//var fs = require('fs-extra');  
const crypto = require('crypto');

//var forms = multer();
const router=express()
//router.use(busboy());
router.use(bodyParser.json());
//router.use(forms);
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors())
router.use(fileupload())



router.listen('5000',()=>{
    console.log('running on localhost:5000');
});

router.use(express.static(__dirname+'/public',{index:"download.html"}))


router.post('/download/',(req,res)=>{
    let program=async()=>{
        let result=await seq.query('call searchMission("'+req.body["sessionKey"]+'","'+req.body["MD5"]+'",@serverId,@downloadState)')
        let state=await seq.query("select @serverId,@downloadState")
        result={}
        result["state"]=state[0][0]["@downloadState"]
        result["data"]={}
        if(state[0][0]["@downloadState"]==1){
            
            p=path.normalize(__dirname+'/mission/'+req.body["MD5"]+'.waypoints')
            raw=fs.readFileSync(p,'utf-8')
            result["data"]["fileName"]=req.body["MD5"]+".waypoints"
            result["data"]["rawString"]=raw 
            let formatted=[]
            for(line of raw.match(/[^\r\n]+/g)){
                formatted.push(line.split('\t'))
            }
            result["data"]["formattedData"]=formatted
            
        }
        res.send(result)  
    }
    program()
})
router.get('/download1/',(req,res)=>{
    let program=async()=>{
            p=path.normalize(__dirname+'/mission/'+req.query["MD5"]+'.waypoints')
            //raw=fs.readFileSync(p,'utf-8')
            res.download(p)
    }
    program()
})

router.post('/upload',(req,res)=>{
    let program=async()=>{
        if(!req.files){
            res.send("File was not found");
            return;
        }
        
        result={}
        

        let file = req.files.mission
        let MD5=md5(file.data)
        let p= path.normalize(__dirname+'/mission/'+MD5+'.waypoints')
        if(!fs.existsSync(p)){
            fs.writeFile(p,file.data.toString('utf8'),()=>{})
            seq.query('call uploadMission(1,"'+MD5+'")')
        }
        await seq.query('call linkMissionToUser("'+req.body["sessionKey"]+'","'+req.body['missionName']+'","'+MD5+'","'+req.body["missionTime"]+'",@linkMissionState)')
        
        let rawState=await seq.query('select @linkMissionState')
        result["state"]=rawState[0][0]["@linkMissionState"]
        result["data"]={}
        res.send(result);

        
    }
    
    program()
})

router.post('/login',(req,res)=>{
    let program= async()=>{
        let result={}
        console.log(req.query)
        let data=await seq.query('call login("'+req.body["userName"]+'","'+req.body["password"]+'",@loginState)')
        let state=await seq.query('select @loginState')
    
        result["state"]=state[0][0]["@loginState"]
        result["data"]={}

        if(data!=undefined){
            result["data"]["sessionKey"]=data[0]["sessionKey"]
        }
        res.send(result)

    }
    program()
})
router.post('/signUp',(req,res)=>{
    let program= async()=>{
        let result={}
        console.log(req.query)
        let data=await seq.query('call signUp("'+req.body["userName"]+'","'+req.body["password"]+'","'+req.body["email"]+'","'+req.body["firstName"]+'","'+req.body["lastName"]+'",@signUpState)')
        let state=await seq.query('select @signUpState')
    
        result["state"]=state[0][0]["@signUpState"]
        result["data"]={}  

        if(data!=undefined){
            result["data"]["sessionKey"]=data[0]["sessionKey"]
        }
        res.send(result)

    }
    program()
})



router.post('/updateMission',(req,res)=>{
    req.body["MissionId"]
    seq.query("INSERT INTO MissionHistory(id,data) Values("+req.body["MissionId"]+",'"+req.body["data"]+"')")
    res.send('Success')
})





router.post('/userAllMission/',(req,res)=>{
let program=async()=>{
    result={}
    let data=await seq.query('call listAllMission("'+req.body["sessionKey"]+'",@listAllMissionState)')
    let state=await seq.query('select @listAllMissionState')
    result['state']=state[0][0]["@listAllMissionState"]
    result["data"]=[]
   
    if(data!=undefined){
        console.log(data[0])
        for(row of data){
            result['data'].push({"MissionId":row["id"],"name":row["name"],"time":row["time"],'MD5':row['MD5']})
        }
    }
    
    res.send(result)
}
program()
})



router.post('/userInfo',(req,res)=>{
let program=async()=>{
    
    let result=await seq.query()
    
}



})

router.get('/stateCode',(req,res)=>{
let program= async()=>{
    let raw=await seq.query('select * from State;')
    result={}
    for( row of raw[0]){
        result[row["id"]]={"StateName":row["stateName"],"comment":row["comment"]}
    }
    res.send(result)
}
program()
})


router.get("/get_drone_data",(req,res)=>{
   let program= async()=>{
    console.log(req.query)
   let id=req.query.mission_id
   let raw =await seq.query("SELECT data from MissionHistory where id="+id +" order by time asc;")
   result={}
   result["data"]=raw[0]
   res.send(result)

    }
    
    program()
})

router.get("/get_drone_path_view",(req,res)=>{
    let id=req.query.mission_id
    res.send(`
<html>
  <head>
  	<style>
      /* Set the size of the div element that contains the map */
      #map {

        overflow:visible;
        height: 1000px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
       }
    </style>
    </head>
  <body>
    <h3>Drone_Map</h3>
    <div id="map"></div>
    <!--The div element for the map -->
    <script>
function req_GET(API, recive) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            recive(this.response)}}
    xhttp.open("GET", API);
    xhttp.send();
}
function req_POST(API, send, recive) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            recive(this.response)}}
    xhttp.open("POST",API, true);
    var data = new FormData();
     send(data)
    xhttp.send(data);
}

function initMap(){

req_GET("https://s3-5000.wk.api.dontcare.info/get_drone_data?mission_id="+`+id+`,
  (data)=>{
    let coordinate=JSON.parse(data)
    
    var path=[]
    for (var i = 0; i < coordinate["data"].length; i++) {
        path.push({lat: coordinate["data"][i].data.lat/10000000.0,lng: coordinate["data"][i].data.lon/10000000.0})
    }
    const map = new google.maps.Map(
      document.getElementById("map"), {zoom: 17, center: path[0], mapTypeId: 'satellite'});
    const flightPath = new google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
    flightPath.setMap(map);
  })
}
    </script>
    <script defer
     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByPmq4SkAlC03_gJV_nfuNgc846Nz5yiM&callback=initMap">
    </script>

  </body>
  </html>`
  )
})



