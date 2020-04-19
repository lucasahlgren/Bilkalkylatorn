import React, { Component } from "react";
import {
	Col,
	Nav,
	NavItem,
	NavLink
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
	faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import { numFormatter } from "../data/tco";

/* Apex charts */
import Chart from "react-apexcharts";

class ChartContainer extends Component {
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
			selectedOption: { label: "Värdeminskning", value: "depreciation" },
			tab: "totalCost"
		};
	}

	/* Lifecycle functions
	==================================================*/

	componentDidMount = () => {
		this.updateData();
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			console.log("new update");
			this.updateData();
		}
	}

	/* Update functions
	==================================================*/
	updateCostFactor = selectedOption => {
		this.setState({ selectedOption: selectedOption }, this.updateData);
	};

	updateTab = e => {
		this.setState({ tab: e.target.getAttribute("data-tab") }, this.updateData);
	};

	updateData = () => {
		console.log(this.state.tab);
		var list = this.props.calculationsList;

		var selectedList = list.filter(
			calculation => calculation.selected === true
		);

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

		var subvention_pos = selectedList.map(calculation => {
			return calculation.subvention;
		});

		var subention_pos_arr = [{ name: "Subvention", data: subvention_pos }];

		var total = selectedList.map(calculation => {
			return calculation.tcoTotal;
		});

		console.log(depreciation);
		console.log(fuel);
		console.log(interest);
		console.log(insurance);
		console.log(maintenance);
		console.log(tax);
		console.log(subvention);

		var seriesStacked = [
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

		if (this.state.tab === "totalCost") {
			var seriesBar = [
				{
					name: "Total",
					data: total
				}
			];
			this.setState({
				series: seriesBar
			});
		} else if (this.state.tab === "costDistribution") {
			this.setState({
				series: seriesStacked
			});
		} else if (this.state.tab === "singleCosts") {
			var selectedOption = this.state.selectedOption;
			console.log(seriesStacked);
			if (selectedOption.label === "Subventioner") {
				this.setState({ series: subention_pos_arr });
			} else {
				var seriesList = seriesStacked.filter(factor => {
					var obj = { ...factor };
					console.log(obj.name);
					console.log(selectedOption.label);
					if (obj.name === selectedOption.label) {
						return true;
					} else {
						return false;
					}
				});

				this.setState({
					series: seriesList
				});
			}
		}
	};

	render() {
		console.log("Bar chart");
		console.log(this.state);

		const { calculationsList } = this.props;
		var selectedCalculations = calculationsList.filter(
			calculation => calculation.selected === true
		);

		var labels = selectedCalculations.map(calculation => {
			return calculation.name;
		});

		const { tab, selectedOption } = this.state;

		var color = [];
		var colorsList = [
			{ color: "#0074D9", factor: "depreciation" },
			{ color: "#111111", factor: "fuel" },
			{ color: "#85144b", factor: "interest" },
			{ color: "#2ECC40", factor: "insurance" },
			{ color: "#FF851B", factor: "maintenance" },
			{ color: "#FF4136", factor: "tax" },
			{ color: "#40E0D0", factor: "subvention" }
		];

		if (tab === "totalCost") {
			color = ["#3d3d3d"];
		} else if (tab === "singleCosts") {
			var colorFilter = colorsList.filter(
				color => color.factor === selectedOption.value
			);
			color = [colorFilter[0].color];
		}

		/* Chart options stacked bar chart
		==================================================*/

		var optionsStacked = {
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
				enabled: true,
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
				followCursor: false,

				onDatasetHover: {
					highlightDataSeries: true
				}
			},

			plotOptions: {
				bar: {
					horizontal: false,

					columnWidth: "45%",
					dataLabels: {
						position: "top" // top, center, bottom,
					}
				}
			},
			xaxis: {
				tickPlacement: "between",
				categories: labels,
				labels: {
					style: {
						fontSize: "0.7rem"
					}
				}
			},
			yaxis: {
				title: {
					text: "Kostnad (kr)",
					offsetX: -10
				},
				labels: {
					formatter: value => {
						return numFormatter(value);
					},
					style: {
						fontSize: "0.7rem"
					},
					minWidth: 80,
					maxWidth: 250
				}
			},

			legend: {
				show: true,
				fontFamily: "Concert One, Arial, sans-serif",
				position: "bottom",
				offsetY: 0,
				itemMargin: {
					horizontal: 5,
					vertical: 5
				},
				onItemHover: {
					highlightDataSeries: false
				},
				onItemClick: {
					toggleDataSeries: true
				}
			},
			fill: {
				opacity: 1
			}
		};

		/* Chart options regular bar chart
		==================================================*/

		var optionsBar = {
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

			colors: color,

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

			dataLabels: {
				enabled: true,
				formatter: value => {
					return numFormatter(value) + " kr";
				},
				offsetY: -15,
				style: {
					fontWeight: "bold",
					fontSize: "12px"
				},
				background: {
					enabled: true,
					foreColor: "black"
				}
			},

			plotOptions: {
				bar: {
					horizontal: false,

					columnWidth: "35%",
					dataLabels: {
						position: "top" // top, center, bottom,
					}
				}
			},
			xaxis: {
				tickPlacement: "between",
				categories: labels,
				labels: {
					style: {
						fontSize: "0.7rem"
					}
				}
			},
			tooltip: {
				enabled: false
			},
			yaxis: {
				title: {
					text: "Kostnad (kr)",
					offsetX: -10
				},
				labels: {
					show: true,
					formatter: value => {
						return numFormatter(value);
					},
					style: {
						fontSize: "0.7rem"
					},
					minWidth: 80,
					maxWidth: 250
				}
			},

			legend: {
				show: false,
				onItemClick: {
					toggleDataSeries: false
				}
			},
			fill: {
				opacity: 1
			}
		};


		/* Render variables
		==================================================*/

		var chartInfo = null;
		var chartStacked = null;
		var chartBarTotal = null;
		var chartBarSingle;
		var dropdown = null;

		var dropDownOptions = [
			{
				label: "Värdeminskning",
				value: "depreciation"
			},
			{
				label: "Bränsle",
				value: "fuel"
			},
			{
				label: "Lånekostnader",
				value: "interest"
			},
			{
				label: "Försäkring",
				value: "insurance"
			},
			{
				label: "Underhåll",
				value: "maintenance"
			},
			{
				label: "Skatt",
				value: "tax"
			},
			{
				label: "Subventioner",
				value: "subvention"
			}
		];

		if (calculationsList.length > 0) {
			if (selectedCalculations.length === 0) {
				chartInfo = (
					<div className="justify-content-center d-flex align-items-center flex-column h-100">
						<FontAwesomeIcon size="3x" icon={faBalanceScale} />

						<p className="p-3">Klicka på kalkylerna du vill jämföra</p>
					</div>
				);

				chartStacked = null;
				chartBarTotal = null;
				chartBarSingle = null;
				dropdown = null;
			} else {
				if (this.state.tab === "costDistribution") {
					chartStacked = (
						<Chart
							height={"86%"}
							width={"100%"}
							options={optionsStacked}
							series={this.state.series}
							type="bar"
							className="bar-chart bar-stacked pt-4"
						/>
					);
					chartBarSingle = null;
					chartBarTotal = null;
					dropdown = null;
				} else if (this.state.tab === "totalCost") {
					chartBarTotal = (
						<Chart
							height={"86%"}
							width={"100%"}
							options={optionsBar}
							series={this.state.series}
							type="bar"
							className="bar-chart pt-4"
						/>
					);
					chartStacked = null;
					chartBarSingle = null;
					dropdown = null;
				} else if (this.state.tab === "singleCosts") {
					chartBarSingle = (
						<Chart
							height={"77%"}
							width={"100%"}
							options={optionsBar}
							series={this.state.series}
							type="bar"
							className="bar-chart pt-4"
						/>
					);
					chartStacked = null;
					chartBarTotal = null;
					dropdown = (
						<Col md="12" lg="6" className="mx-auto mt-3">
							<Select
								blurInputOnSelect={true}
								isSearchable={false}
								className="filter-select border"
								classNamePrefix="filter-option"
								value={this.state.selectedOption}
								onChange={this.updateCostFactor}
								options={dropDownOptions}
							/>
						</Col>
					);
				}
			}
		} else {
			chartInfo = (
				<div className="justify-content-center d-flex align-items-center flex-column h-100">
					<FontAwesomeIcon size="3x" icon={faBalanceScale} />

					<p className="p-3">Skapa kalkyler för att jämföra olika alternativ</p>
				</div>
			);
		}

		return (
			<Col md="9" xs="11" className="mx-auto chart-container">
				<Nav tabs className="chart-tabs">
					<NavItem>
						<NavLink
							active={this.state.tab === "totalCost"}
							onClick={this.updateTab}
							data-tab="totalCost"
							data-active={this.state.tab === "totalCost"}
							className="chart-tab"
						>
							Totalkostnad
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							active={this.state.tab === "singleCosts"}
							onClick={this.updateTab}
							data-tab="singleCosts"
							data-active={this.state.tab === "singleCosts"}
							className="chart-tab"
						>
							Enskilda kostnader
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							active={this.state.tab === "costDistribution"}
							onClick={this.updateTab}
							data-tab="costDistribution"
							data-active={this.state.tab === "costDistribution"}
							className="chart-tab"
						>
							Kostnadsfördelning
						</NavLink>
					</NavItem>
				</Nav>

				{chartInfo}
				{dropdown}

				{chartStacked}
				{chartBarTotal}
				{chartBarSingle}
			</Col>
		);
	}
}

export default ChartContainer;
