const Sequelize= require('sequelize')
const config = require('./config/config.json')
const seq= new Sequelize(config["aws"])
const fs= require('fs')
const path =require('path')
const md5= require('md5')

process.on('message',(raw)=>{
    let f=JSON.parse(raw)
    
    switch(f["Function"]){
        case "download":
        download(f)
        break;
        case "upload":
        upload(f)
        break;

    }
})

function download(f){
    let program=async()=>{
        let result=await seq.query("call downloadMission("+f["missionID"]+")")
        p=path.normalize(__dirname+'/download/id_'+result[0]["id"]+'.waypoints')
        result={}
        result["Function"]="download"
        result["APIID"]=f["APIID"]
        result["Path"]=p

        process.send(JSON.stringify(result))
        
    }
    program()
}

function upload(f){
    let program=async()=>{
        
        
    }

}


