import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChargingStation,
	faBalanceScale,
	faGasPump,
	faBurn
} from "@fortawesome/free-solid-svg-icons";
import { numFormatter } from "../data/tco";

/* Apex charts */
import Chart from "react-apexcharts";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [
				{
					name: "Värdeminskning",
					data: [13000]
				},
				{
					name: "Bränsle",
					data: [10000]
				},
				{
					name: "Lånekostnader",
					data: [3000]
				},
				{
					name: "Försäkring",
					data: [1300]
				},
				{
					name: "Underhåll",
					data: [1300]
				},
				{
					name: "Skatt",
					data: [700]
				},
				{
					name: "Subventioner",
					data: [0]
				}
			],

			options: {
				states: {
					active: {
						allowMultipleDataPointsSelection: false,
						filter: {
							type: "none",
							value: 0
						}
					}
				},

				responsive: [
					{
						breakpoint: 991,
						options: {
							chart: {
								width: "100%",
								height: "100%"
							},
							legend: {
								position: "bottom",
								itemMargin: {
									horizontal: 20,
									vertical: 10
								}
							}
						}
					}
				],

				colors: [
					"#0074D9",
					"#111111",
					"#85144b",
					"#2ECC40",
					"#FF851B",
					"#FF4136",
					"#40E0D0"
				],

				chart: {
					type: "bar",
					fontFamily: "Poppins, Arial, sans-serif",
					fontWeight: "bold",
					stacked: true,
					toolbar: {
						show: true
					},
					zoom: {
						enabled: true
					},

					locales: [
						{
							name: "se",
							options: {
								toolbar: {
									exportToSVG: "Ladda ner SVG",
									exportToPNG: "Ladda ner PNG",
									menu: "Meny",
									exportToCSV: "Ladda ner CSV",
									selection: "Markera",
									selectionZoom: "Markera Zoom",
									zoomIn: "Zooma In",
									zoomOut: "Zooma Ut",
									pan: "Panorera",
									reset: "Återställ Zoom"
								}
							}
						}
					],
					defaultLocale: "se"
				},

				tooltip: {
					y: {
						formatter: value => {
							return numFormatter(value) + " kr";
						}
					},

					style: {
						fontSize: "0.7rem",
						fontWeight: "bold"
					},
					intersect: true,
					followCursor: true,

					onDatasetHover: {
						highlightDataSeries: true
					}
				},
				dataLabels: {
					enabled: false
				},

				plotOptions: {
					bar: {
						horizontal: false,

						columnWidth: "55%",
						dataLabels: {
							position: "top" // top, center, bottom,
						}
					}
				},
				xaxis: {
					tickPlacement: "between",
					categories: ["Test"],
					labels: {
						style: {
							fontSize: "0.7rem"
						}
					}
				},
				yaxis: {
					title: {
						text: "Total ägandekostnad (kr)",
						offsetX: 0
					}
				},

				legend: {
					show: false,
					fontFamily: "Concert One, Arial, sans-serif",
					position: "bottom",
					offsetX: -10,
					offsetY: 0,

					itemMargin: {
						horizontal: 5,
						vertical: 5
					},
					onItemHover: {
						highlightDataSeries: false
					}
				},
				fill: {
					opacity: 1
				}
			}
		};
	}

	componentDidMount = () => {
		this.updateData(this.props.calculationsList);
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			console.log("new update");
			this.updateData(this.props.calculationsList);
		}
	}

	updateData = list => {
		var selectedList = list.filter(
			calculation => calculation.selected === true
		);

		var labels = selectedList.map(calculation => {
			return calculation.name;
		});

		var depreciation = selectedList.map(calculation => {
			return calculation.depreciation;
		});

		var fuel = selectedList.map(calculation => {
			return calculation.fuel;
		});

		var interest = selectedList.map(calculation => {
			return calculation.interest;
		});

		var insurance = selectedList.map(calculation => {
			return calculation.insurance;
		});

		var maintenance = selectedList.map(calculation => {
			return calculation.maintenance;
		});

		var tax = selectedList.map(calculation => {
			return calculation.tax;
		});

		var subvention = selectedList.map(calculation => {
			return calculation.subvention * -1;
		});

		console.log(depreciation);
		console.log(fuel);
		console.log(interest);
		console.log(insurance);
		console.log(maintenance);
		console.log(tax);
		console.log(subvention);

		console.log(labels);

		var series = [
			{
				name: "Värdeminskning",
				data: depreciation
			},
			{
				name: "Bränsle",
				data: fuel
			},
			{
				name: "Lånekostnader",
				data: interest
			},
			{
				name: "Försäkring",
				data: insurance
			},
			{
				name: "Underhåll",
				data: maintenance
			},
			{
				name: "Skatt",
				data: tax
			},
			{
				name: "Subventioner",
				data: subvention
			}
		];


		/* Legend bug fix */
		this.setState({
			options: {
				...this.state.options,
				xaxis: {
					categories: labels
				},
				legend: {
					show: true,
					fontFamily: "Concert One, Arial, sans-serif",
					position: "bottom",
					offsetX: -10,
					offsetY: 0,

					itemMargin: {
						horizontal: 5,
						vertical: 10
					},
					onItemHover: {
						highlightDataSeries: false
					}
				}
			},
			series: series
		});
	};

	render() {
		console.log("BAR CHART RENDERED")

		const { calculationsList } = this.props;
		var selectedCalculations = calculationsList.filter(
			calculation => calculation.selected === true
		);

		var chart = null;
		if (calculationsList.length > 0) {
			if (selectedCalculations.length === 0) {
				chart = (
					<div className="justify-content-center d-flex align-items-center flex-column h-100">
						<FontAwesomeIcon size="3x" icon={faBalanceScale} />

						<p className="p-3">Klicka på kalkylerna du vill jämföra</p>
					</div>
				);
			} else {
				chart = (
					<Chart
						height={"100%"}
						options={this.state.options}
						series={this.state.series}
						type="bar"
						className="bar-chart"
					/>
				);
			}
		} else {
			chart = (
				<div className="justify-content-center d-flex align-items-center flex-column h-100">
					<FontAwesomeIcon size="3x" icon={faBalanceScale} />

					<p className="p-3">Skapa kalkyler för att jämföra olika alternativ</p>
				</div>
			);
		}

		return (
			<Col md="9" xs="11" className="mx-auto chart-container">
				{chart}
			</Col>
		);
	}
}

export default BarChart;
