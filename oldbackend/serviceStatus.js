const net = require('net');

var AWS = require('aws-sdk');


const client = net.connect({port: 80, host:"google.com"}, () => {
  console.log('MyIP='+client.localAddress);
  console.log('MyPORT='+client.localPort);
});




var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
var ec2 = new AWS.EC2();

var params = { Filters: [{Name: 'domain', Values: ['vpc']}]};

ec2.describeAddresses(params, function(err, data) {
  if (err) {console.log("Error", err);} 
  else {
    let addr= data.Addresses[0]["PublicIp"]
    console.log(addr);
  }
});