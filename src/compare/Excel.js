import React, { Component } from "react";
import { Button } from "shards-react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function Excel(props) {
	const { calculationsList, disabled } = props;

	var dataList = calculationsList.map(calculation => {
		return [
			{ value: calculation.name },
			{ value: calculation.car.brand },
			{ value: calculation.variant.variant },
			{ value: calculation.variant.type.swe==="Laddhybrid" ? calculation.variant.type.types.swe[0] + "/" + calculation.variant.type.types.swe[1] : calculation.variant.type.swe },
			{ value: calculation.variant.price.value.toString() + " kr" },
			{ value: calculation.years.toString() },
			{ value: calculation.miles.toString() },
			{ value: calculation.payment.toString() + "%" },
			{ value: calculation.interestRate.toString() + "%" },
			{ value: calculation.depreciationRate.toString() + "%" },
			{ value: calculation.variant.type.swe==="El" ? calculation.fuelCost.toString() + " kr/kWh" : calculation.fuelCost.toString() + " kr/l" },
			{ value: calculation.variant.fuel.value.toString() + " " + calculation.variant.fuel.unit.toString() + "/100 km" },
			{ value: "" },
			{ value: calculation.depreciation.toString() + " kr" },
			{ value: calculation.fuel.toString() + " kr" },
			{ value: calculation.tax.toString() + " kr" },
			{ value: calculation.insurance.toString() + " kr" },
			{ value: calculation.maintenance.toString() + " kr" },
			{ value: calculation.subvention.toString() + " kr" },
			{ value: "" },
			{ value: calculation.tcoTotal.toString() + " kr" }
		];
	});

	console.log(dataList);

	const multiDataSet = [
		{
			columns: [
				"Kalkylnamn",
				"Bilmärke",
				"Modell",
				"Drivmedel",
				"Inköpspris",
				"År",
				"Mil per år",
				"Kontantinsats",
				"Ränta",
				"Värdeminskning",
				"Drivmedelspris",
				"Bränslekonsumtion",
				"",
				"Värdeminskning",
				"Bränsle",
				"Skatt",
				"Försäkring",
				"Underhåll",
				"Subventioner",
				"",
				"Totalkostnad"
			],
			data: dataList
		}
	];

	var button = disabled === true ?  <Button disabled pill theme="light" size="md">
	Ladda ner Excel-fil
</Button>:<Button  pill theme="light" size="md">
	Ladda ner Excel-fil
</Button>;

	return (
		<ExcelFile
			filename="TCO-kalkyler"
			element={button
				
			}
		>
			<ExcelSheet dataSet={multiDataSet} name="TCO-kalkyler"></ExcelSheet>
		</ExcelFile>
	);
}

export default Excel;
