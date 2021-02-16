const Sequelize= require('sequelize');
const config = require('./config/config.json')
const seq= new Sequelize(config["aws"])
const fs= require('fs')
const path =require('path')
const program=async()=>{
    
var p=path.normalize(__dirname+'/upload/latest.waypoints')
   const data= fs.readFileSync(p,{encoding:'utf8',flag:'r'}) 
   seq.query('call uploadMission("'+data.toString()+'")')
   fs.unlink(p,()=>{})
}

program()