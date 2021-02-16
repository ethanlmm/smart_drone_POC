const express=require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const multer = require('multer');
const fs= require('fs')


const slaveGen = require('child_process')
const backend = slaveGen.fork('slave')
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



var forms = multer();
const router=express()
router.use(bodyParser.json());
router.use(forms.array());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors())

router.listen('5000',()=>{
    console.log('running on localhost:5000');
});

router.use(express.static(__dirname+'/public',{index:"index.html"}))

router.get('/download/',(req,res)=>{
    var APIID=getRandomInt(10000000)
    request={}
    request["APIID"]=APIID
    request["Function"]="download"
    request["missionID"]=req.query.missionID
    
    backend.send(JSON.stringify(request))
    backend.on('message',(raw)=>{
        let result=JSON.parse(raw)
        if(result['Function']=='download'&&result['APIID']==APIID){
            res.download(result["Path"])
        }
    })
    
})

