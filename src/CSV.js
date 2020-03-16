import { CSVLink, CSVDownload } from "react-csv";
import React, { Component } from "react";
import { Button } from "shards-react";

var headers = [
	{ label: "First Name", key: "firstname" },
	{ label: "Last Name", key: "lastname" },
	{ label: "Email", key: "email" }
];

var data = [
	{ firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
	{ firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
	{ firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

function CSV(props) {
	console.log(props)
		return (
			<CSVLink headers={headers} data={data} filename={"tco.csv"}>
				<Button pill theme="light" size="md">
					Ladda ner CSV
				</Button>
			</CSVLink>
		);
	
}

export default CSV;
