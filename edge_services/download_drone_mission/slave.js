const Sequelize= require('sequelize')
const config = require('./config/config.json')
const seq= new Sequelize(config["aws"])
const fs= require('fs')
const path =require('path')


process.on('message',(raw)=>{
    let f=JSON.parse(raw)
    
    switch(f["Function"]){
        case "download":
        download(f)
        break;

    }


})

function download(f){
    let program=async()=>{
        let result=await seq.query("call downloadMission("+f["missionID"]+")")
        let p=__dirname+'\\download\\id_'+f["APIID"]+'.waypoints'
        fs.writeFile(path.normalize(p),result[0]["mission"].toString('utf8'),()=>{
            result={}
            result["Function"]="download"
            result["APIID"]=f["APIID"]
            result["Path"]=p
            process.send(JSON.stringify(result))
        })
    }
    program()
}