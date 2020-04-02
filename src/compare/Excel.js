import React, { Component } from "react";
import { Button } from "shards-react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function Excel(props) {
	const { calculationsList } = props;

	var dataList = calculationsList.map(calculation => {
		return [
			{ value: calculation.name },
			{ value: calculation.car.brand },
			{ value: calculation.variant.variant },
			{ value: calculation.variant.type.swe },
			{ value: calculation.variant.price.value.toString() + " kr" },
			{ value: calculation.years.toString() },
			{ value: calculation.miles.toString() },
			{ value: calculation.payment.toString() + "%" },
			{ value: calculation.interestRate.toString() + "%" },
			{ value: calculation.depreciationRate.toString() + "%" },
			{ value: calculation.variant.type.swe==="El" ? calculation.fuelCost.toString() + " kr/kWh" : calculation.fuelCost.toString() + " kr/l" },
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

	return (
		<ExcelFile
			filename="TCO-kalkyler"
			element={
				<Button pill theme="light" size="md">
					Ladda ner Excel-fil
				</Button>
			}
		>
			<ExcelSheet dataSet={multiDataSet} name="TCO-kalkyler"></ExcelSheet>
		</ExcelFile>
	);
}

export default Excel;
