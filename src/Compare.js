import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./apexStyle.css";
import { Container, Row, Col, Card, Button } from "shards-react";
import SliderCustomRange from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChargingStation,
	faPercentage,
	faGasPump,
	faBurn
} from "@fortawesome/free-solid-svg-icons";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import CSV from "./CSV";

export default class Compare extends Component {
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
					name: "Underhåll",
					data: [1300, 2300, 2000, 800, 1003, 1500]
				},
				{
					name: "Skatt",
					data: [700, 1700, 1500, 1500, 2100, 1600]
				},
				{
					name: "Subventioner",
					data: [2100, 700, 2500, 1300, -2200, 1500]
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
					"#FF4136"
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

	update = () => {
		var series = [
			{
				name: "Värdeminskning",
				data: [
					13000,
					parseFloat(Math.random() * 10 * 2300).toFixed(0),
					2000,
					8000,
					1300
				]
			},
			{
				name: "Bränsle",
				data: [10000, 2300, 20000, 8000, 13000]
			},
			{
				name: "Lånekostnader",
				data: [
					3000,
					2380,
					2000,
					parseFloat(Math.random() * 10 * 800).toFixed(0),
					1300
				]
			},
			{
				name: "Service",
				data: [
					1300,
					200,
					parseFloat(Math.random() * 10 * 2300).toFixed(0),
					800,
					1003
				]
			},
			{
				name: "Skatt",
				data: [700, 1700, 1500, 1500, 2100]
			},
			{
				name: "Subventioner",
				data: [2100, 700, 2500, 1300, 2200]
			}
    ];
    
    var options = 
   {
    xaxis: {
      categories: [
        "BMW X3 ID",
        "Volvo V90",
        "Tesla Model 3",
        "Tesla Model S",
        "Opel Korsa",
      ]}}
		this.setState({...this.state, series: series, options: options });
	};

	render() {
		return (
			<Container>
				<Card className="p-md-4 p-2">
					<Row>
						<Col md="9" xs="11" className="mx-auto vh-75 vw-100">
							<Chart
								options={this.state.options}
								series={this.state.series}
								type="bar"
								height={"100%"}
							/>
						</Col>

						<Col md="3" className="options">
							<SimpleBar
								className="px-3"
								autoHide={false}
								forceVisible="y"
								style={{ height: "80vh" }}
							>
                <h4 className="text-center">Kalkyler</h4>
                <Card className="m-2" onClick={this.update}>
                  <p className="d-flex align-items-center justify-content-center">Kalkyl 1</p>
                </Card>
                <Card className="m-2">
                  <p className="d-flex align-items-center justify-content-center">Kalkyl 2</p>
                </Card>
                <Card className="m-2">
                  <p className="d-flex align-items-center justify-content-center">Kalkyl 3</p>
                </Card>

                {/* 
								<SliderCustomRange
									min={0}
									max={10}
									title={"Ränta"}
									unit={"%"}
									icon={<FontAwesomeIcon icon={faPercentage} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Kontantinsats"}
									unit={"%"}
									icon={<FontAwesomeIcon icon={faPercentage} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Värdeminskning"}
									unit={"%"}
									icon={<FontAwesomeIcon icon={faPercentage} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Elpris"}
									unit={" kr/kwh"}
									icon={<FontAwesomeIcon icon={faChargingStation} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Bensinpris"}
									unit={" kr/l"}
									icon={<FontAwesomeIcon icon={faGasPump} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Dieselpris"}
									unit={" kr/l"}
									icon={<FontAwesomeIcon icon={faGasPump} />}
								/>
								<SliderCustomRange
									min={0}
									max={100}
									title={"Etanolpris"}
									unit={" kr/l"}
									icon={<FontAwesomeIcon icon={faBurn} />}
                />
                */}
								<Button pill theme="light" size="md"
									onClick={this.update}>Uppdatera
								</Button>
								<CSV />
							</SimpleBar>
						</Col>
					</Row>
				</Card>
			</Container>
		);
	}
}
