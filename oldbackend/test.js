var fs = require('fs-extra');  
var path = require('path');
const program=async()=>{
    let p= path.normalize(__dirname+'/mission/'+'d465d08b941ec84bc1a4b2fe5fb4edc7'+'.waypoints')
    raw=fs.readFileSync(p,'utf-8')
    let formatted=[]
    for(line of raw.match(/[^\r\n]+/g)){
        formatted.push(line.split('\t'))
    }
    console.log(formatted)
}
program()