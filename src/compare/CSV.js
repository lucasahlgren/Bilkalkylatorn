import { CSVLink, CSVDownload } from "react-csv";
import React, { Component } from "react";
import { Button } from "shards-react";

var headers = [
	{ label: "Kalkylnamn", key: "name" },
	{ label: "Bilmärke", key: "car" },
	{ label: "Modell", key: "model" },
	{ label: "Version", key: "variant" },
	{ label: "År", key: "years" },
	{ label: "Mil/år", key: "miles" },
	{ label: "Kontantinsats", key: "payment" },
	{ label: "Ränta", key: "interest" }
];

function CSV(props) {
	const { calculationsList } = props;
	
	var data = calculationsList.map(calculation => {
		return {
			name: calculation.name,
			car: calculation.car.brand,
			model: calculation.car.model,
			variant: calculation.variant.variant,
			years: calculation.years,
			miles: calculation.miles,
			payment: calculation.payment,
			interest: calculation.interest
		};
	});
	console.log(data);
	return (
		<CSVLink headers={headers} data={data} filename={"tco.csv"}>
			<Button pill theme="light" size="md">
				Ladda ner CSV
			</Button>
		</CSVLink>
	);
}

export default CSV;
