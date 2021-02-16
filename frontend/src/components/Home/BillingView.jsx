import React, { Component, useState, useEffect, Fragment } from "react";
import {properties} from "../../properties";
import axios from "axios";
import ReactTable from "react-table-6"; 
import 'react-table-6/react-table.css'

export default class BillingView extends Component {

	constructor(props){
    super(props)
    this.state = {
      users: [],
      loading:true
    }
  	}
	
	async getAdminData(){
		const res = await axios.get(properties.backendhost + "billing/getAllBills")
		console.log(res.data)
		this.setState({loading:false, users: res.data})
	}
	
	async getUserData(){
		const res = await axios.get(properties.backendhost + "billing/getUserBills")
		console.log(res.data)
		this.setState({loading:false, users: res.data})
	}
	
	componentDidMount(){
		var isAdmin = (localStorage.getItem("usertype").localeCompare("customer") === 0) ? false: true;
		
		if (!isAdmin) { // user
		
			this.getUserData()
		
		} else { // admin
		
			this.getAdminData()
		
		}
		
	}
	
	
	
	
	render() {
	
	const columns = [{  
      Header: 'ID',  
      accessor: 'request_id',
     }
     ,{  
      Header: 'Cost of Battery Usage',  
      accessor: 'battery_cost' ,
      },
      {  
      Header: 'Cost of Distance Traveled',  
      accessor: 'distance_cost' ,
      },
      {  
      Header: 'Cost for Session Support',  
      accessor: 'time_cost' ,
      },
      {  
      Header: 'Total',  
      accessor: 'totalcost' ,
      }
  	]
	
		return ( 
			
				<ReactTable  
      data={this.state.users}  
      columns={columns}  
   />
		  
		);
	}
}




function makePretty(data) {
	var pretty = ""
	for (var i=0; i < data.length; i++) {
		pretty = pretty + "total cost for ID " + data[i][0] + ": " + data[i][1] + ", \n"
	}
	return pretty
}

function getTableContent(arr) {
		const iterateItem = (item) => {
		   return item.map(function (nextItem, j) {
			 return (
				<tr key={nextItem.type}>
				   <td><b>{nextItem.request_id}</b></td>
				   <td><b>{nextItem.totalcost}</b></td>
				</tr>
			 );
		   })
		}
		return arr.map(function (item, i) {
			return (
				<table key="billingabc">
				<thead><b>{item.request_id}</b></thead>
					<tbody>
					<h5>	{iterateItem(item)}</h5>
					</tbody>
				</table>
			);
		});
	};

function GetRequestHooks() {
    const [totalReactPackages, setTotalReactPackages] = React.useState(null);
	var parsedStuff;
	var tableData;
	
	
	
	
    useEffect(() => {
        const backendurl = properties.backendhost + "billing/getAllBills";
		axios
		  .get(backendurl)
		  .then((response) => {
			console.log(response.data);
			
			parsedStuff = [];
			for(var i in response.data)
    			parsedStuff.push([i, response.data[i]]);
			setTotalReactPackages(makePretty(response.data));
			console.log("Bills = " + parsedStuff);
			tableData = response.data;
		  })
		  .catch((error) => {
			console.log(error);
		  });
    }, []);
    
    
    var table = document.createElement('table')
    , tableBody = document.createElement('tbody');

	if (tableData) {

		tableData.forEach(function(rowData) {
			var row = document.createElement('tr');

			rowData.forEach(function(cellData) {
			  var cell = document.createElement('td');
			  cell.appendChild(document.createTextNode(cellData));
			  row.appendChild(cell);
			});

			tableBody.appendChild(row);
		});

		table.appendChild(tableBody);
		document.body.appendChild(table);
	
	}
	
	console.log("table: " + (table));
	
	if (tableData == undefined) {
		 <div className="card text-center m-3">
            <h5 className="card-header">Welcome to BillingView</h5>
            <div className="card-body">
                Bills -- {totalReactPackages}
            </div>

        </div>
	}
    return (
		<div  style={{ height: "75vh" }} >
		<div className="row">
		<div className="col s12 center-align background blue">
		<h2 className="text-center text-white font-italic font-family-sans-serif">
		  Billing View
		</h2>
		</div>   
	  </div>
        <div className="card text-center m-3">			
        {getTableContent(tableData)}
		</div>
        </div>
    );


}

//export default BillingView;