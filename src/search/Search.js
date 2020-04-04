import data from "../data/data.json";
import {numFormatter} from "../data/tco";

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
		var monthlyCost = (tco / 36);
		return monthlyCost;
	};

	updateList = list => {
		this.setState({ list: list });
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

		return (
			<Container fluid className="p-0 m-0 search">
				<div className="search-body p-0 m-0 grey-bg">
					<div className="search-header" />
					<div className="search-section px-0">
						<Container>
							<Row>
							<Col>
								<h2 className="title text-center">
									<strong>Bilsök</strong>
								</h2>
					
							</Col>
							</Row>
						<Row>
							<Col lg="3">
						<Container>
						<Row className="m-0">
							<Col className="p-0">
								
								<SearchForm updateList={this.updateList} />
							</Col>
						</Row>
						</Container>
						</Col>
						<Col lg="9">
							<Container>
							<motion.div
								className="row py-3 justify-content-md-start justify-content-center"
								variants={container}
								initial="hidden"
								animate="visible"
								exit={{ opacity: 0 }}
							>
								{this.state.list.map(car => {
									this.fuelTypes(car.variants);
									return (
										<motion.div
											key={car.id}
											className="search-item col-lg-4 col-md-4 col-sm-6 col-11 my-md-3"
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
												<motion.div whileHover={{ scale: 1.03 }}>
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
														
																<Col
																	md="12"
																	xs="6"
																	className="px-1 m-0 car-header"
																>
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
																		{numFormatter(car.variants[0].price.value)}{" "}
																		{car.variants[0].price.unit}
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
																		{numFormatter(this.monthlyCost(
																			car.variants[0].price.value
																		))}{" "}
																		kr
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
						</Col>

						</Row>
						</Container>
					</div>
				</div>
			</Container>
		);
	}
}

export default Search;
