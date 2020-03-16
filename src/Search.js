import data from "./data.json";

import React, { Component } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	CardImg,
	CardFooter,
	CardColumns,
	CardTitle,
	Button,
	FormGroup,
	FormInput,
	Form,
	FormSelect
} from "shards-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

class Search extends Component {
	constructor(props) {
		super(props);
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
			string += "/";
			string += uniqueTypes[i];
		}
		//console.log(string);

		return string;
	};

	monthlyCost = tco => {
		var monthlyCost = (tco / 36).toFixed(0);
		var string = monthlyCost.toLocaleString();
		return string;
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
			<Container fluid className="p-0 m-0">
				<div className="search-body p-0 m-0 grey-bg">
					<div className="search-header" />
					<div className="search-section px-0">
						<Row className="m-0">
							<Col>
								<h2 className="title text-center">
									<strong>Bilsök</strong>
								</h2>
								<SearchForm />
							</Col>
						</Row>
						<Container>
							<motion.div
								className="row py-3"
								variants={container}
								initial="hidden"
								animate="visible"
							>
								{data.cars.map(car => {
									this.fuelTypes(car.variants);
									return (
										<motion.div
											key={car.id}
											className="col-lg-3 col-md-4 col-sm-6 col-12 my-md-3"
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
												<motion.div
													whileHover={{ scale: 1.03 }}
													whileTap={{ scale: 0.97 }}
												>
													<Card className="m-md-0 my-3">
														<CardImg
															top={true}
															className="img-fluid"
															src={require("./assets/images/cars/" + car.image)}
														/>

														<Container className="px-4 py-3">
															<CardTitle className="text-center m-0">
																{car.brand} {car.model}
															</CardTitle>
															<Row>
																<Col
																	md="3"
																	xs="6"
																	className="p-2 m-0 car-header"
																>
																	<span className="m-0">Längd</span>
																	<p className="m-0">3 år</p>
																</Col>
																<Col
																	md="4"
																	xs="6"
																	className="p-2 m-0 car-header"
																>
																	<span className="m-0">Mil/år</span>
																	<p className="m-0">1 500 mil</p>
																</Col>
																<Col
																	md="5"
																	xs="6"
																	className="p-2 m-0 car-header"
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
																	className="p-2 m-0 car-header"
																>
																	<span className="m-0">
																		Total ägandekostnad
																	</span>
																	<p className="m-0">
																		{"Fr. "}
																		{car.variants[0].price.value.toLocaleString()}{" "}
																		{car.variants[0].price.unit}
																	</p>
																</Col>
																<Col
																	md="6"
																	xs="6"
																	className="p-2 m-0 car-header"
																>
																	<span className="m-0">Månadskostnad</span>
																	<p className="m-0">
																		{"Fr. "}
																		{this.monthlyCost(
																			car.variants[0].price.value
																		)}{" "}
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
					</div>
				</div>
			</Container>
		);
	}
}

export default Search;
