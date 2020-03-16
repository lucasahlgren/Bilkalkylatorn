import React, { Component } from "react";

/* Apex charts */
import Chart from "react-apexcharts";
import "./apexStyle.css";

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [
				{
					name: "Värdeminskning",
					data: [13000, 23000, 2000, 8000, 1300, 1200]
				},
				{
					name: "Bränsle",
					data: [10000, 2300, 20000, 8000, 13000, 1200]
				},
				{
					name: "Lånekostnader",
					data: [3000, 2300, 2000, 800, 1300, 2000]
				},
				{
					name: "Försäkring",
					data: [1300, 2300, 2000, 800, 1003, 1500]
				},
				{
					name: "Underhåll",
					data: [1300, 2300, 2000, 800, 1003, 1500]
				},
				{
					name: "Skatt",
					data: [700, 1700, 1500, 1500, 2100, 1600]
				},
				{
					name: "Subventioner",
					data: [0, 0, -6000, -6000, 0, 0]
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
					fontFamily: "Space Mono, Arial, sans-serif",
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
							return value + " kr";
						}
					},

					style: {
						fontSize: "0.7rem"
					},
					intersect: true,
					followCursor: true,

					onDatasetHover: {
						highlightDataSeries: true
					}
				},
				dataLabels: {
					textAnchor: "middle",
					formatter: function(val, opt) {
						return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
					},
					enabled: false,
					style: {
						fontSize: "0.6rem",

						fontWeight: "bold"
					}
				},

				plotOptions: {
					bar: {
						horizontal: false,
						dataLabels: {
							position: "top", // top, center, bottom,
							formatter: function(val, opt) {
								return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
							}
						}
					}
				},
				xaxis: {
					categories: [
						"BMW X3 ID",
						"Volvo V90",
						"Tesla Model 3",
						"Tesla Model S",
						"Opel Korsa",
						"Volkswagen Passat"
					],
					labels: {
						style: {
							fontSize: "0.6rem"
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

	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="bar"
				height={"100%"}
			/>
		);
	}
}

export default BarChart;
