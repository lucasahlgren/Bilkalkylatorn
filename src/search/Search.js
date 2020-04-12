import data from "../data/data.json";
import {
	numFormatter,
	tcoTotal,
	tcoFuelCost,
	tcoMaintenanceYear,
	tcoInsuranceYear
} from "../data/tco";

import React, { Component } from "react";
import { Container, Row, Col, Card, CardImg, CardTitle } from "shards-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: data.cars
		};
	}

	fuelTypes = variants => {
		//console.log(variants);
		var types = variants.map(item => {
			return item.type.swe;
		});
		types.sort();

		var uniqueTypes = types.filter(
			(item, i, types) => types.indexOf(item) === i
		);
		//console.log(uniqueTypes);
		let string = uniqueTypes[0];
		for (var i = 1; i < uniqueTypes.length; i++) {
			//console.log(uniqueTypes[i]);
			string += " | ";
			string += uniqueTypes[i];
		}
		//console.log(string);

		return string;
	};

	monthlyCost = tco => {
		var monthlyCost = tco / 36;
		return monthlyCost;
	};

	componentDidMount = () => {
		var carList = [...data.cars];
		var resultslist = carList.map(car => {
			var newCarObj = this.getLowestTCOObj(car);
			return newCarObj;
		});

		var sortedList = resultslist.sort(function(a, b) {
			return a.tco - b.tco;
		});

		this.setState({ list: sortedList });
	};

	calculateTCO = variant => {
		var years = 3;
		var miles = 1500;
		var payment = 20;
		var interestRate = 5;
		var depreciationRate = 50;
		var maintenanceYear = tcoMaintenanceYear(variant);
		var insuranceYear = tcoInsuranceYear(variant);
		var fuelCost = tcoFuelCost(variant.type);

		return tcoTotal(
			variant,
			years,
			miles,
			payment,
			interestRate,
			depreciationRate,
			fuelCost,
			insuranceYear,
			maintenanceYear
		);
	};

	getLowestTCOObj = car => {
		var newCarObj = { ...car };
		console.log(car.brand + " " + car.model);
		var tcoCalculations = car.variants.map(variant => {
			var tco = this.calculateTCO(variant);
			console.log(variant.variant);
			console.log(tco);
			return tco;
		});
		//console.log(tcoCalculations);
		var sort = tcoCalculations.sort(function(a, b) {
			return a - b;
		});
		//console.log(sort);
		newCarObj.tco = sort[0];
		return newCarObj;
	};

	updateList = list => {
		if (list.length > 0) {
			var resultslist = list.map(car => {
				var newCarObj = this.getLowestTCOObj(car);
				return newCarObj;
			});
			var sortedList = resultslist.sort(function(a, b) {
				return a.tco - b.tco;
			});

			this.setState({ list: sortedList });
		} else {
			this.setState({ list: list });
		}
	};

	render() {
		console.log(data);

		const container = {
			hidden: { opacity: 1, scale: 0 },
			visible: {
				opacity: 1,
				scale: 1,
				transition: {
					delay: 0.1,
					when: "beforeChildren",
					staggerChildren: 0.1
				}
			}
		};

		const item = {
			hidden: { y: 20, opacity: 0 },
			visible: {
				y: 0,
				opacity: 1
			}
		};

		var noHit =
			this.state.list.length === 0 ? (
				<Col sm="6" className="mx-auto">
					<Card className="p-5 text-center">
						<p className="m-0">
							<strong>Ingen träff</strong>
						</p>
					</Card>
				</Col>
			) : null;

		return (
			<Container fluid className="p-0 m-0 search">
				<div className="search-body p-0 m-0 grey-bg">
					<div className="search-header">
						<Container className="h-100 w-100 d-flex align-items-center justify-content-center">
							<Row className="m-0 w-100">
								<Col className="w-100">
									<h2 className="title text-center">
										<strong>Bilsök</strong>
									</h2>
									<SearchForm updateList={this.updateList} />
								</Col>
							</Row>
						</Container>
					</div>
					<div className="search-section px-0">
						<Container>
							<motion.div
								className="row pb-3 justify-content-md-start"
								variants={container}
								initial="hidden"
								animate="visible"
								exit={{ opacity: 0 }}
							>
								{noHit}
								{this.state.list.map(car => {
									this.fuelTypes(car.variants);
									return (
										<motion.div
											key={car.id}
											className="search-item col-lg-3 col-md-4 col-sm-6 col-11 my-md-3"
											variants={item}
										>
											<Link
												className="link-style"
												to={`/bil/${car.id}/${car.brand
													.toLowerCase()
													.replace(
														/\s+/g,
														""
													)}/${car.model.toLowerCase().replace(/\s+/g, "")}`}
											>
												<motion.div whileHover={{ scale: 1.02 }}>
													<Card className="m-md-0 my-3">
														<CardImg
															top={true}
															className="img-fluid"
															src={require("../assets/images/cars/" +
																car.image)}
														/>
														<Container className="px-4 pb-2 pt-3">
															<CardTitle className="text-center m-0 p-md-0 p-2 car-title">
																{car.brand} {car.model}
															</CardTitle>
															<Row className="pt-1">
																<Col xs="12" className="px-1 m-0 car-header">
																	<span className="m-0">Drivmedel</span>
																	<p className="m-0">
																		{this.fuelTypes(car.variants)}
																	</p>
																</Col>
															</Row>
															<Row>
																<Col
																	md="6"
																	xs="6"
																	className="px-1 m-0 car-header"
																>
																	<span className="m-0">Totalkostnad</span>
																	<p className="m-0">
																		{"Fr. "}
																		{numFormatter(car.tco)}
																		{" kr"}
																	</p>
																</Col>
																<Col
																	md="6"
																	xs="6"
																	className="px-1 m-0 car-header"
																>
																	<span className="m-0">Månadskostnad</span>
																	<p className="m-0">
																		{"Fr. "}
																		{numFormatter(this.monthlyCost(car.tco))} kr
																	</p>
																</Col>
															</Row>
														</Container>
													</Card>
												</motion.div>
											</Link>
										</motion.div>
									);
								})}
							</motion.div>
						</Container>
					</div>
				</div>
			</Container>
		);
	}
}

export default Search;
