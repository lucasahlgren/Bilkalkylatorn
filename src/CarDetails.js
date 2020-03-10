import React, { Component } from "react";
import { Container, Row, Col, Card, Button, CardImg } from "shards-react";
import data from "./data.json";

class CarDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataLoading: true,
			car: null,
			years: 3,
			mile: 1500,
			cash: 0.1,
			interest: 0.06,
			deprecation: 0.5
		};
	}

	get_car = id => {
		var car = data.cars.filter(car => {
			return car.id.toString() === id;
		});
		if (car.length > 1) {
			console.log("Several cars have the same ID!");
		} else if (car.length == 1) {
			return car[0];
		}
	};

	componentDidMount = () => {
		const { match } = this.props;
		const carId = match.params.carId;
		var car = this.get_car(carId);
		console.log(car);
		console.log("ID" + carId);
		var variant = car.variants[0];
		this.setState({ dataLoading: false, car: car, variant: variant });
	};

	render() {
		const { car, variant } = this.state;

		return (
			<div>
				{this.state.dataLoading ? null : (
					<Container className="padding-section">
                        <Row>
                            <Col md="11" className="mx-auto">
						<Card>
							<Row>
								<Col className="mx-auto vw-100">
									<Row>
										<Col md="6" className="pr-md-0">
											<CardImg
												top={true}
												className="img-fluid"
												src={require("./assets/images/cars/" + car.image)}
											/>
										</Col>
										<Col md="6 fill">
											<Row>
												<Col md="12" className="text-center">
													<h2>
														{car.brand} {car.model}
													</h2>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<h6>Total ägandekostnad</h6>
													<p>
														{variant.price.value} {variant.price.unit}
													</p>
												</Col>
											</Row>
										</Col>
									</Row>
									<Container>
										<Row className="p-4">
											<Col md="2" sm="6" className="mx-auto">
												<span>Inköpspris</span>
												<p className="p-0">
													{variant.price.value} {variant.price.unit}
												</p>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Motoreffekt</span>
												<p className="p-0">
													{variant.engine.hk} hk ({variant.engine.kw} kw)
												</p>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Drivmedel</span>
												<p className="p-0">{variant.type.swe}</p>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Bränslekonsumtion</span>
												<p className="p-0">
													{variant.fuel.value} {variant.fuel.unit}/100 km
												</p>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Växellåda</span>
												<p className="p-0">{variant.transmission.swe}</p>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>CO2-utsläpp</span>
												<p className="p-0">
													{variant.emissions.value} {variant.emissions.unit}
												</p>
											</Col>

											<Col md="2" sm="6" className="mx-auto">
												<span>År</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Mil/år</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Kontantinsats</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Ränta</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Drivmedelspris</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>

											<Col md="2" sm="6" className="mx-auto">
												<span>Värdeminskning</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>

											<Col md="2" sm="6" className="mx-auto">
												<span>Värdeminskning</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Värdeminskning</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Värdeminskning</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
											<Col md="2" sm="6" className="mx-auto">
												<span>Värdeminskning</span>
												<div class="slidecontainer">
													<input
														type="range"
														min="1"
														max="100"
														class="slider"
													/>
												</div>
											</Col>
										</Row>
									</Container>
								</Col>
							</Row>
						</Card>
                        </Col>
                        </Row>
					</Container>
				)}
			</div>
		);
	}
}

export default CarDetails;
