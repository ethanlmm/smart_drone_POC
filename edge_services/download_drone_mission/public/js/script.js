const edge_server='http://localhost:8080/'


function download(){
const path=document.getElementById('path').value
const mission=document.getElementById('ID').value
req("download",
(send)=>{
    send.append('path',path)
    send.append('missionID',mission)
},
(recive)=>{
    alert(recive)
   
})
}


function req(API, send, recive) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            recive(this.response)
        }

    }
    xhttp.open("POST", edge_server + API, true);
    var data = new FormData();

    send(data)
    //xhttp.setRequestHeader("Content-type", "json");
    xhttp.send(data);
}