const mysql = require("mysql");

// DB config
const sqlURI = require("./keys").sqlURI;


//Create Connection
const db = mysql.createPool(sqlURI);

// db.connect(function(err){
//     if (err){
//       console.log('error connecting:' + err.stack);
//     }
//     console.log('connected successfully to DB.');
//   });
  
module.exports= { db : mysql.createPool(sqlURI)
};
