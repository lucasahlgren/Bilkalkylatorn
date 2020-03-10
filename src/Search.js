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

	render() {
		console.log(data);

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
						<Row className="py-3">
							{data.cars.map(car => {
								return (
									<Col key={car.id} lg="3" md="4" sm="6" xs="12" className="my-3">
										<Link
											className="link-style"
											to={`/bil/${car.id}/${car.brand
												.toLowerCase()
												.replace(/\s+/g, "")}/${car.model
												.toLowerCase()
												.replace(/\s+/g, "")}`}
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
															<Col md="3" xs="6" className="p-2 m-0 car-header">
																<span className="m-0">Längd</span>

																<p className="m-0">3 år</p>
															</Col>
															<Col md="5" xs="6" className="p-2 m-0 car-header">
																<span className="m-0">Mil/år</span>

																<p className="m-0">1500 mil</p>
															</Col>
															<Col md="4" xs="6" className="p-2 m-0 car-header">
																<span className="m-0">Drivmedel</span>

																<p className="m-0">
																	{car.variants[0].type.swe}
																</p>
															</Col>
														</Row>
														<Row>
															<Col md="6" xs="6" className="p-2 m-0 car-header">
																<span className="m-0">Total ägandekostnad</span>

																<p className="m-0">
																	{car.variants[0].price.value}{" "}
																	{car.variants[0].price.unit}
																</p>
															</Col>
															<Col md="6" xs="6" className="p-2 m-0 car-header">
																<span className="m-0">Månadskostnad</span>

																<p className="m-0">
																	{(car.variants[0].price.value / 36).toFixed(
																		0
																	)}{" "}
																	kr
																</p>
															</Col>
														</Row>
													</Container>
												</Card>
											</motion.div>
										</Link>
									</Col>
								);
							})}
						</Row>
            </Container>
					</div>
				</div>
			</Container>
		);
	}
}

export default Search;
