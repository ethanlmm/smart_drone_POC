const edge_server="https://s3-5000.wk.api.dontcare.info"


function download(){
let mission=document.getElementById('MD5').value
window.open(edge_server+"/download1/?MD5="+mission)
}
function upload(){
    let mission=document.getElementById('upload_file').files[0]
    let userID= document.getElementById('uploadUserID').value
    
    req_POST("/upload",
    (data)=>{
        data.append('mission',mission)
        data.append('userID',userID)
    },
    (recive)=>{
        alert(recive)
    }
    )
}

function req_POST(API, send, recive) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            recive(this.response)
        }
    }
    xhttp.open("POST", edge_server + API, true);
    var data = new FormData();
     send(data)
    xhttp.send(data);
}






function changePage(page) {
    switch (page) {
        case "home": //user homepage, personal profile page, account summary, logged in
        case "account":
        case "profile":
        case "login":
            window.location = 'account.html'
            loadProfile()
            break
        case "map":
            window.location = 'map.html'
            break
        case "official chase":
            window.location = 'https://locator.chase.com/search'
        default: //website homepage, the landing page, logged out
            sessionStorage.clear()
            window.location = 'index.html#'
    }
}



function loadProfile() {
    //doAction("UserInfo")
    UserAccountSummary()
   // document.getElementById("username").innerHTML = sessionStorage.firstName + " " + sessionStorage.lastName
}

function hide(panel) {
    if (panel === "all") {
        Array.from(document.getElementsByClassName("secondaryPanel")).forEach(e => e.setAttribute("style", "visibility: collapse"))
    } else document.getElementById(panel).setAttribute("style", "visibility: collapse")
}



function load(panel) {
    hide("all")

    function show() { document.getElementById(panel).setAttribute("style", "visibility: visible") }
    switch (panel) {
        case "newAcc":
            show()
            break
        case "userSetting":
            document.getElementById("fill-firstName").innerHTML = sessionStorage.firstName
            document.getElementById("fill-lastName").innerHTML = sessionStorage.lastName
            document.getElementById("fill-userID").innerHTML = sessionStorage.userID
            document.getElementById("fill-address").innerHTML = sessionStorage.address
            show()
            break
        case "support":
            show()
            break
        default:
            if (!document.getElementById("selected")) alert("Please select an account")
            else {
                show()
                switch (panel) {
                    case "transactionPanel":
                        Array.from(document.getElementsByClassName("aTrans")).forEach(t => t.remove())
                        doAction("AccountTransactionHistory")
                        break
                    case "transferPanel":
                        document.getElementById("donor").innerHTML = sessionStorage.accountID
                        break
                    case "depositPanel":

                        break
                    case "accountSetting":
                        let account = JSON.parse(sessionStorage["A" + sessionStorage.accountID])
                        document.getElementById("fill-accName").innerHTML = account["Account Name"]

                        document.getElementById("fill-accType").innerHTML = account["Account Type"]
                        document.getElementById("fill-accNum").innerHTML = sessionStorage.accountID
                        break
                }
            }
    }
}


function addAcc(...args) {

    let row = document.createElement("tr")
    row.setAttribute("class", "button")
    row.setAttribute("onclick", "select(this)")
    for (arg of args){
        let col = document.createElement("td")
        col.setAttribute('class', 'black')
        col.innerHTML=arg
        row.appendChild(col)
    }
    document.getElementById("accountMissions").appendChild(row)
}

function addAcc1(){
    let a = document.createElement("td")
    a.setAttribute("class", "acc")
    a.setAttribute("id", accNumber)
    a.innerHTML = accName
    let b = document.createElement("td")
    b.setAttribute("class", "gray")
    b.innerHTML = accNumber
    let c = document.createElement("td")
    c.setAttribute("class", "money")
    c.innerHTML = accValue
    row.appendChild(a)
    row.appendChild(b)
    row.appendChild(c)
    document.getElementById("accountMissions").appendChild(row)
}
function UserAccountSummary1()
{
    req(act,
        (data) => {
            data.append("User ID", sessionStorage.userID)
            data.append("Password", sessionStorage.password)
            data.append("Include Inactive", false)
        },
        (raw) => {
    
            sessionStorage.UserAccountSummary = raw
            let accounts = JSON.parse(raw)["Accounts"]
                //cokies will only store string, so make json stringify and decode it.
            for (acc of accounts) { //JSON.parse(sessionStorage.UserAccountSummary)["Accounts"]
                sessionStorage.setItem("A" + acc["Account ID"], JSON.stringify(acc)) //individual account 
                addAcc("A", "b", "c")
            }})
            
}
function UserAccountSummary()
{
    addAcc("mission name: mission 1", "Date: 2020-5-30      ", "Status:  Confirmed , Onglong, Finished, ")
            
}






















