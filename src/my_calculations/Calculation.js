import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { numFormatter } from "../data/tco";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
	Container,
	Row,
	Col,
	Card,
	Button,
	CardImg
} from "shards-react";

class Calculation extends Component {
	removeCalculation = calculationName => {
		console.log(calculationName);
		this.props.removeCalculation(calculationName);
	};

	confirmDelete = e => {
		console.log(e.target);
		var calculationName = e.currentTarget.getAttribute("data-calculation");
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<Container>
						<div className="py-4 px-4 card">
							<Container>
								<Row>
									<Col>
									<h4 className="text-center confirm-dialog-title">
										<strong>Vill du radera {calculationName}?</strong>
									</h4>
									</Col>
								</Row>
								<Row className="d-flex justify-content-around m-0 pt-2">
									<span>
									<Button
									size="md"
										pill
										theme="secondary"
										className="px-5 mt-3 mx-2 mt-md-0"
										onClick={onClose}
									>
										Nej
									</Button>

									<Button
										pill
										size="md"
										theme="danger"
										className="px-5 mt-3 mx-2 mt-md-0"
										onClick={() => {
											this.removeCalculation(calculationName);
											onClose();
										}}
									>
										Ja
									</Button>
									</span>
								</Row>
							</Container>
						</div>
					</Container>
				);
			}
		});
	};

	render()
	 {
		const { calculation } = this.props;
		console.log(calculation);

		var fuelsLabel = null;
		if(calculation.variant.type.swe === "Laddhybrid"){
			fuelsLabel = calculation.variant.type.types.swe[0]+"/"+calculation.variant.type.types.swe[1];;
		}else{
			fuelsLabel = calculation.variant.type.swe;
		}
	
		return (
			<Col md="12" className="p-3 mx-auto my-calculation">
				<Card>
					<Row>
						<Col md="6" className="pr-md-0">
							<CardImg
								className="img-fluid detail-img"
								src={require("../assets/images/cars/" + calculation.image)}
							/>
						</Col>

		{/* <Col md="3" className="px-0 py-0">
							<Container className="h-100">
								<Row className="h-100">
									<Col
										xs="12"
										className="h-100 p-0 d-md-flex p-3 p-md-0 align-items-center"
									>
										<PieChart
											depreciation={calculation.depreciation}
											fuel={calculation.fuel}
											maintenance={calculation.maintenance}
											interest={calculation.interest}
											insurance={calculation.insurance}
											tax={calculation.tax}
										/>
									</Col>
								</Row>
							</Container>
						</Col>
		*/}
						
						<Col md="6" className="pt-3 px-md-4 pl-md-5">
							<Container>
								<Row>
									<Col md="12" className="pt-md-3 pl-md-0">
										<Container className="p-md-2 py-2 pb-4 ">
											<Row>
												<Col xs="6">
													<Row className="pl-md-1 pl-4">
														
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Värdeminskning</h5>
															<p className="mb-3">
																{numFormatter(calculation.depreciation)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>
												<Col xs="6">
													<Row className="pl-md-1 pl-4">
														
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Underhåll</h5>
															<p className="mb-3">
																{numFormatter(calculation.maintenance)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>
												<Col xs="6">
													<Row className="pl-md-1 pl-4 pull-right">
													
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Bränsle</h5>
															<p className="mb-3">
																{numFormatter(calculation.fuel)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>

												<Col xs="6">
													<Row className="pl-md-1 pl-4">
														
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Lånekostnader</h5>
															<p className="mb-3">
																{numFormatter(calculation.interest)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>
												<Col xs="6">
													<Row className="pl-md-1 pl-4">
														
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Försäkring</h5>
															<p className="mb-3">
																{numFormatter(calculation.insurance)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>
												<Col xs="6">
													<Row className="pl-md-1 pl-4">
														
														<Col xs="12" className="pl-2">
															<h5 className="mb-0">Skatt</h5>
															<p className="mb-3">
																{numFormatter(calculation.taxYearTotal)} {"kr"}
															</p>
														</Col>
													</Row>
												</Col>
												<Col xs="12">
													<Row className="pt-2 pb-0 pt-md-0 pb-md-1 p-0">
														<Col xs="6" className="pl-md-0">
															<div className="card p-2 car-details-bonus">
																<h6 className="m-0">Bonus</h6>
																<p className="m-0">
																	{numFormatter(calculation.subvention)} {"kr"}
																</p>
															</div>
														</Col>
														<Col xs="6" className="pl-md-0">
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

					<Row className="p-3 bg-light px-0 m-0">
						<Col md="11" className="mx-auto">
							<Row className="d-md-flex justify-content-around d-none">
								<div>
									<h6 className="mb-1">Inköpspris</h6>
									<p className="m-md-0 mb-2">
										{numFormatter(calculation.variant.price.value)}{" "}
										{calculation.variant.price.unit}
									</p>
								</div>
								<div>
									<h6 className="mb-1">Drivmedel</h6>
									<p className="m-md-0 mb-2">
										{fuelsLabel}
									</p>
								</div>
								<div>
									<h6 className="mb-1">Längd</h6>
									<p className="m-md-0 mb-2">{calculation.years} år</p>
								</div>
								<div>
									<h6 className="mb-1">Körsträcka</h6>
									<p className="m-md-0 mb-2">
										{numFormatter(calculation.miles)} mil/år
									</p>
								</div>
								<div>
									<h6 className="mb-1">Kontantinsats</h6>
									<p className="m-md-0 mb-2">{calculation.payment}%</p>
								</div>
								<div>
									<h6 className="mb-1">Ränta</h6>
									<p className="m-md-0 mb-2">{calculation.interestRate}%</p>
								</div>
								<div>
									<h6 className="mb-1">Värdeminskning</h6>
									<p className="m-md-0 mb-2">{calculation.depreciationRate}%</p>
								</div>
							</Row>
							<Row className="d-md-none px-2">
								<Col xs="6">
									<h6 className="mb-1">Inköpspris</h6>
									<p className="m-0 mb-2">
										{numFormatter(calculation.variant.price.value)}{" "}
										{calculation.variant.price.unit}
									</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Drivmedel</h6>
									<p className="m-md-0 mb-2">{fuelsLabel}</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Längd</h6>
									<p className="m-md-0 mb-2">{calculation.years} år</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Körsträcka</h6>
									<p className="m-md-0 mb-2">
										{numFormatter(calculation.miles)} mil/år
									</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Kontantinsats</h6>
									<p className="m-md-0 mb-2">{calculation.payment}%</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Ränta</h6>
									<p className="m-md-0 mb-2">{calculation.interestRate}%</p>
								</Col>
								<Col xs="6">
									<h6 className="mb-1">Värdeminskning</h6>
									<p className="m-md-0 mb-2">{calculation.depreciationRate}%</p>
								</Col>
							</Row>
						</Col>
					</Row>

					<Row className="bg-light m-0 p-0 my-calculation-bottom-total">
						<Col lg="12" className="px-3 pb-3 pt-0">
							<Card className="p-3">
								<Row>
									<Col lg="4" className="p-md-0 pb-4 align-items-center d-flex flex-column">
										<Row>
											<Col>
												<h2 className="text-center mb-0">
													{calculation.name}

													<FontAwesomeIcon
														onClick={this.confirmDelete}
														data-calculation={calculation.name}
														icon={faTrashAlt}
														className="ml-2 p-1 delete-calculation"
														color="red"
													/>
												</h2>
											</Col>
										</Row>
										<Row>
										<Col>
											<h4 className="m-0 text-center">
												{calculation.car.brand +
													" " +
													calculation.car.model +
													" " +
													calculation.variant.variant}
											</h4>
										</Col>
										</Row>
									</Col>
									<Col xs="6" md="4" lg="2" className="mx-auto">
										<Card className="h-100 bg-dark justify-content-center text-center">
											<span>
												<strong className="text-white calculation-tco-ratio">
													{numFormatter(calculation.tcoRatio) + "%"}
												</strong>
											</span>
										</Card>
									</Col>

									<Col xs="6" md="4" lg="2" className="mx-auto">
										<h6 className="m-0">Totalkostnad</h6>
										<h4 className="m-0 py-0 total-cost">
											<strong>
												{numFormatter(calculation.tcoTotal) + " kr"}
											</strong>
										</h4>
									</Col>

									<Col xs="6" md="4" lg="2" className="mt-md-0 mt-3">
										<h6 className="m-0">Månadskostnad</h6>
										<p className="m-0 py-0">
											{numFormatter(calculation.tcoMonthly)} {"kr/mån"}
										</p>
									</Col>
									<Col xs="6" md="4" lg="2" className="mt-md-0 mt-3">
										<h6 className="m-0">Milkostnad</h6>
										<p className="m-0 py-0">
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
