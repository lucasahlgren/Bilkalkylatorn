import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PieChart from "../car_details/PieChart";
import { numFormatter } from "../data/tco";

import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Collapse,
	CardImg
} from "shards-react";

class Calculation extends Component {
	constructor(props) {
		super(props);
	}

	removeCalculation = e => {
		console.log(e.target);
		var calculationName = e.currentTarget.getAttribute("data-calculation");
		console.log(calculationName);
		this.props.removeCalculation(calculationName);
	};

	render() {
		const { calculation } = this.props;
		console.log(calculation);
		return (
			<Col md="12" className="p-3 mx-auto">
				<Card>
					<Row>
						<Col md="4" className="pr-md-0">
							<CardImg
								className="img-fluid detail-img"
								src={require("../assets/images/cars/" + calculation.image)}
							/>
						</Col>
						<Col md="8" className="pl-2 pr-3">
							<Container>
								<Row>
									<Col md="4" lg="4" className="p-0 pt-3 pl-0">
										<PieChart
											depreciation={calculation.depreciation}
											fuel={calculation.fuel}
											maintenance={calculation.maintenance}
											interest={calculation.interest}
											insurance={calculation.insurance}
											tax={calculation.tax}
										/>
									</Col>
									<Col md="8" className="pt-md-3 pl-md-0">
										<Container className="p-2 my-calculation-costs">
											<Row>
												<Col md="4" xs="6">
													<h6 className="mb-1">Värdeminskning</h6>
													<p className="mb-2">
														{numFormatter(calculation.depreciation)} {"kr"}
													</p>
												</Col>
												<Col md="4" xs="6">
													<h6 className="mb-1">Bränsle</h6>
													<p className="mb-2">
														{numFormatter(calculation.fuel)} {"kr"}
													</p>
												</Col>
												<Col md="4" xs="6">
													<h6 className="mb-1">Lånekostnader</h6>
													<p className="mb-2">
														{numFormatter(calculation.interest)} {"kr"}
													</p>
												</Col>

												<Col md="4" xs="6">
													<h6 className="mb-1">Underhåll</h6>
													<p className="mb-2">
														{numFormatter(calculation.maintenance)} {"kr"}
													</p>
												</Col>
												<Col md="4" xs="6">
													<h6 className="mb-1">Försäkring</h6>
													<p className="mb-2">
														{numFormatter(calculation.insurance)} {"kr"}
													</p>
												</Col>
												<Col md="4" xs="6">
													<h6 className="mb-1">Skatt</h6>
													<p className="mb-2">
														{numFormatter(calculation.tax)} {"kr"}
													</p>
												</Col>
												<Col xs="12">
													<Row className="py-3 py-md-0 p-0">
														<Col xs="6">
															<div className="card p-2 car-details-bonus">
																<h6 className="m-0">Bonus</h6>
																<p className="m-0">
																	{numFormatter(calculation.subvention)} {"kr"}
																</p>
															</div>
														</Col>
														<Col xs="6">
															<div className="card p-2 car-details-malus">
																<h6 className="m-0">Malus</h6>
																<p className="m-0">
																	{numFormatter(calculation.malus)} {"kr"}
																</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
										</Container>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>

					<Row>
						<Col lg="12" className="px-4 pb-2 pt-0">
							<Card className="p-3">
								<Row>
									<Col lg="4">
										<Row>
											<Col md="12">
												<h5 className="text-center ">
													{calculation.name}

													<FontAwesomeIcon
														onClick={this.removeCalculation}
														data-calculation={calculation.name}
														icon={faTrashAlt}
														className="ml-2 p-1 delete-calculation"
														color="red"
														title="Radera kalkyl"
													/>
												</h5>
											</Col>
										</Row>
										<h6 className="m-0 text-center">
											{calculation.car.brand +
												" " +
												calculation.car.model +
												" " +
												calculation.variant.variant}
										</h6>
									</Col>
									<Col xs="6" md="4" lg="2" className="mx-auto">
										<Card className="h-100 bg-dark justify-content-center text-center">
											<span>
												<strong className="text-white">
													{numFormatter(calculation.tcoRatio) + "%"}
												</strong>
											</span>
										</Card>
									</Col>

									<Col xs="6" md="4" lg="2" className="mx-auto">
										<h6 className="m-0">Totalkostnad</h6>
										<h4 className="m-0 py-1">
											<strong>
												{numFormatter(calculation.tcoTotal) + " kr"}
											</strong>
										</h4>
									</Col>

									<Col xs="6" md="4" lg="2">
										<h6 className="m-0">Månadskostnad</h6>
										<p className="m-0 py-1">
											{numFormatter(calculation.tcoMonthly)} {"kr/månad"}
										</p>
									</Col>
									<Col xs="6" md="4" lg="2">
										<h6 className="m-0">Milkostnad</h6>
										<p className="m-0 py-1">
											{numFormatter(calculation.tcoMile)} {"kr/mil"}
										</p>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</Card>
			</Col>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		calculationsList: state.tco.calculationsList
	};
};

const mapDispatchToProps = dispatch => ({
	removeCalculation: calculationName =>
		dispatch({ type: "REMOVE_CALCULATION", payload: calculationName })
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);
