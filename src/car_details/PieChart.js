import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChargingStation,
	faBalanceScale,
	faGasPump,
	faBurn
} from "@fortawesome/free-solid-svg-icons";
import {numFormatter} from "../data/tco";

/* Apex charts */
import Chart from "react-apexcharts";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [],

			options: {
				colors: [
					"#0074D9",
					"#111111",
					"#85144b",
					"#2ECC40",
					"#FF851B",
					"#FF4136",
					"#40E0D0"
				],

				legend: {
					show: false
                },
                plotOptions: {
                    pie: {
                      expandOnClick: false
                    }},

				dataLabels: {
					fontSize: "1rem",
					fontFamily: "Poppins",
					fontWeight: 400
				},
				chart: {
					fontFamily: "Poppins"
                },
                
                tooltip: {
                    enabled: true,
                   
                   y: {
                    formatter: (value) => { return numFormatter(value) + " kr" },
                  }
                },

				labels: ["Värdeminskning", "Bränsle", "Lånekostnader", "Försäkring", "Underhåll", "Skatt"],
				name: {
					show: true,
					fontSize: "22px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: 600
				},

				responsive: [
					{
						breakpoint: 767,
						options: {
							chart: {
								width: "100%",
								height: "auto"
							}
						}
					}
				],

			
			}
		};
	}

	componentDidMount = () => {
        const {depreciation, fuel, tax, maintenance, interest, insurance} = this.props;
        /* {"Värdeminskning", "Bränsle", "Lånekostnader", "Försäkring", "Underhåll", "Skatt"]*/
        var series = [depreciation,fuel,interest,insurance,maintenance,tax]
        console.log(series)
        this.setState({series: series})
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
            console.log("hej")
            const {depreciation, fuel, tax, maintenance, interest, insurance} = this.props;
            /* {"Värdeminskning", "Bränsle", "Lånekostnader", "Försäkring", "Underhåll", "Skatt"]*/
            var series = [depreciation,fuel,interest,insurance,maintenance,tax]
            this.setState({series: series})
		}
	}



	render() {
		return (
			<Col xs="12" className="h-100 p-0">
          
				<Chart
					options={this.state.options}
					series={this.state.series}
                    type="pie"
                    className="pie-chart"
				
				
				/>
           
			</Col>
		);
	}
}

export default PieChart;
