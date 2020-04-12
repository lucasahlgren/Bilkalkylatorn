import React, { Component } from "react";
import { Container, Row, Col, Card, Button, CardImg } from "shards-react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import data from "../data/data.json";
import {
	numFormatter,
	tcoSubventions,
	tcoFuel,
	tcoFuelCost,
	tcoDepreciation,
	tcoInterest,
	tcoTaxYear,
	tcoTaxTotal,
	tcoMalusYear,
	tcoMaintenanceYear,
	tcoInsuranceYear,
	tcoMaintenanceTotal,
	tcoInsuranceTotal,
	tcoMalusTotal,
	tcoTotal
} from "../data/tco";
import Select from "react-select";
import PieChart from "./PieChart";

import bonusIcon from "../assets/icons/bonus.png";

class CarDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataLoading: true,
			selectedOption: [],
			calculationName: "Placeholder",
			car: null,
			years: 3,
			miles: 1500,
			payment: 20,
			interest: 0,
			interestRate: 5,
			depreciation: 0,
			depreciationRate: 50,
			fuelCost: 0,
			fuel: 0,
			taxYear: 0,
			malusTotal: 0,
			malusYear: 0,
			taxTotal: 0,
			insuranceYear: 0,
			maintenanceYear: 0,
			insuranceTotal: 0,
			maintenanceTotal: 0,
			subvention: 0,
			tcoTotal: 0,
			depreciationRateInput: 0,
			paymentInput: 0,
			fuelCostInput: 0,
			interestRateInput: 0,
			insuranceInput: 0,
			maintenanceInput: 0,
			yearsInput: 0,
			milesInput: 0
		};
	}

	componentDidMount = () => {
		window.scrollTo(0, 0);
		const { match } = this.props;
		const carId = match.params.carId;
		var car = this.getCar(carId);
		console.log(car);
		var variant = car.variants[0];
		var name = `${car.brand} ${car.model}`;

		/* Image */

		var image = car.image;

		/* Calculations */
		var years = this.state.years;
		var miles = this.state.miles;
		var payment = this.state.payment;
		var depreciationRate = this.state.depreciationRate;
		var interestRate = this.state.interestRate;

		/* Subventions */
		var subvention = tcoSubventions(variant);

		/* Tax */
		var taxYear = tcoTaxYear(variant);
		var malusYear = tcoMalusYear(variant);
		var malusTotal = tcoMalusTotal(variant, years);
		var taxTotal = tcoTaxTotal(variant, years);
		var taxYearTotal = taxYear * years;

		/* Fuel */
		var fuelCost = tcoFuelCost(variant.type);
		var fuel = tcoFuel(variant, fuelCost, years, miles);

		/* depreciation */
		var depreciation = tcoDepreciation(variant, depreciationRate);

		/* Interest */
		var interest = tcoInterest(variant, interestRate, payment, years);

		/* Maintanence */
		var maintenanceYear = tcoMaintenanceYear(variant);
		var maintenanceTotal = tcoMaintenanceTotal(variant, years, maintenanceYear);

		/* Insurance */
		var insuranceYear = tcoInsuranceYear(variant);
		var insuranceTotal = tcoInsuranceTotal(variant, years, insuranceYear);

		/* TCO total */
		var tco = tcoTotal(
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

		var resetObject = {};
		resetObject.years = years;
		resetObject.miles = miles;
		resetObject.payment = payment;
		resetObject.interestRate = interestRate;
		resetObject.depreciationRate = depreciationRate;
		resetObject.maintenanceYear = maintenanceYear;
		resetObject.insuranceYear = insuranceYear;

		this.setState({
			dataLoading: false,
			car: car,
			variant: variant,
			variants: car.variants,
			selectedOption: { label: variant.variant, value: variant.variant },
			subvention: parseInt(subvention.toFixed(0)),
			fuelCost: parseFloat(fuelCost),
			interest: parseInt(interest.toFixed(0)),
			fuel: parseInt(fuel.toFixed(0)),
			depreciation: parseInt(depreciation.toFixed(0)),
			taxYear: parseInt(taxYear.toFixed(0)),
			taxYearTotal: parseInt(taxYearTotal.toFixed(0)),
			malusYear: parseInt(malusYear.toFixed(0)),
			malusTotal: parseInt(malusTotal.toFixed(0)),
			taxTotal: parseInt(taxTotal.toFixed(0)),
			insuranceYear: parseFloat(insuranceYear),
			maintenanceYear: parseFloat(maintenanceYear),
			insuranceTotal: parseInt(insuranceTotal.toFixed(0)),
			maintenanceTotal: parseInt(maintenanceTotal.toFixed(0)),
			calculationName: name,
			resetObject: resetObject,
			tcoTotal: parseInt(tco),
			image: image,
			depreciationRateInput: depreciationRate,
			paymentInput: payment,
			fuelCostInput: fuelCost,
			interestRateInput: interestRate,
			insuranceInput: insuranceYear,
			maintenanceInput: maintenanceYear,
			yearsInput: years,
			milesInput: miles
		});
	};

	/* Help functions
	==================================================*/

	getCar = id => {
		var car = data.cars.find(car => car.id.toString() === id);
		console.log(car);
		if (car === undefined) {
			console.log("The car does not exist!");
		} else {
			return car;
		}
	};

	getMonthlyCost = () => {
		const { years, tcoTotal } = this.state;
		var monthlyCost = tcoTotal / (years * 12);
		return monthlyCost;
	};

	getMileCost = () => {
		const { miles, years, tcoTotal } = this.state;
		if (miles != 0) {
			var mileCost = tcoTotal / (miles * years);
			return mileCost;
		} else {
			return 0;
		}
	};

	getTCORatio = () => {
		const { variant, tcoTotal } = this.state;
		var ratio = (tcoTotal / variant.price.value) * 100;
		return ratio;
	};

	/* Input functions
	==================================================*/

	handleNameChange = e => {
		this.setState({ calculationName: e.target.value });
	};

	resetVariabels = () => {
		const { resetObject, variant } = this.state;
		var fuelCost = tcoFuelCost(variant.type);
		this.setState(
			{
				years: resetObject.years,
				miles: resetObject.miles,
				payment: resetObject.payment,
				interestRate: resetObject.interestRate,
				depreciationRate: resetObject.depreciationRate,
				fuelCost: fuelCost,
				maintenanceYear: resetObject.maintenanceYear,
				insuranceYear: resetObject.insuranceYear,
				depreciationRateInput: resetObject.depreciationRate,
				paymentInput: resetObject.payment,
				fuelCostInput: fuelCost,
				interestRateInput: resetObject.interestRate,
				insuranceInput: resetObject.insuranceYear,
				maintenanceInput: resetObject.maintenanceYear,
				yearsInput: resetObject.years,
				milesInput: resetObject.miles
			},
			this.updateData
		);
	};

	saveCalculation = () => {
		const {
			calculationName,
			car,
			variant,
			years,
			miles,
			payment,
			taxTotal,
			malusYear,
			malusTotal,
			insuranceTotal,
			maintenanceTotal,
			subvention,
			fuel,
			depreciation,
			depreciationRate,
			interestRate,
			interest,
			image,
			taxYear,
			taxYearTotal,
			tcoTotal,
			fuelCost
		} = this.state;

		var tcoRatio = this.getTCORatio();
		var tcoMonthly = this.getMonthlyCost();
		var tcoMile = this.getMileCost();

		var calculation = {};
		calculation.name = calculationName.trim();
		calculation.car = car;
		calculation.variant = variant;
		calculation.years = years;
		calculation.miles = miles;
		calculation.payment = payment;
		calculation.fuel = fuel;
		calculation.fuelCost = fuelCost;
		calculation.tax = taxTotal;
		calculation.malus = malusTotal;
		calculation.insurance = insuranceTotal;
		calculation.maintenance = maintenanceTotal;
		calculation.subvention = subvention;
		calculation.depreciation = depreciation;
		calculation.depreciationRate = depreciationRate;
		calculation.interest = interest;
		calculation.interestRate = interestRate;
		calculation.selected = false;
		calculation.image = image;
		calculation.taxYear = taxYear;
		calculation.taxYearTotal = taxYearTotal;
		calculation.tcoTotal = tcoTotal;
		calculation.tcoRatio = tcoRatio;
		calculation.tcoMonthly = tcoMonthly;
		calculation.tcoMile = tcoMile;
		//console.log(calculation);
		this.props.addCalculation(calculation);
	};

	handleKeyPress = key => {
		if (key.charCode === 13) {
			this.saveCalculation();
		}
	};

	changeDepreciationInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value > 100) {
			input = 100;
			value = 100;
		} else if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState(
			{ depreciationRate: value, depreciationRateInput: input },
			this.updateData
		);
	};

	changeFuelInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState({ fuelCost: value, fuelCostInput: input }, this.updateData);
	};

	changeYearsInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value <= 0 || value === "") {
			input = 1;
			value = 1;
		}
		this.setState({ years: value, yearsInput: input }, this.updateData);
	};

	changePaymentInput = e => {
		console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value >= 100) {
			input = 100;
			value = 100;
		} else if (value === "") {
			input = "";
			value = 0;
		}

		this.setState(
			{ payment: parseFloat(value), paymentInput: input },
			this.updateData
		);
	};

	changeInterestInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState(
			{ interestRate: parseFloat(value), interestRateInput: input },
			this.updateData
		);
	};

	changeMilesInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState({ miles: value, milesInput: input }, this.updateData);
	};

	changeInsuranceInput = e => {
		//console.log("Insurance " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState(
			{ insuranceYear: value, insuranceInput: input },
			this.updateData
		);
	};

	changeMaintenanceInput = e => {
		//console.log("Change " + e.target.value);
		var value = e.target.value;
		var input = e.target.value;
		if (value < 0) {
			input = 0;
			value = 0;
		} else if (value === "") {
			value = 0;
			input = "";
		}
		this.setState(
			{ maintenanceYear: value, maintenanceInput: input },
			this.updateData
		);
	};

	/* Update functions
	==================================================*/
	updateVariant = selectedOption => {
		const { variants } = this.state;
		var newVariant = variants.find(
			variant => variant.variant === selectedOption.value
		);
		console.log(newVariant);
		var fuelCost = tcoFuelCost(newVariant.type);

		this.setState(
			{
				selectedOption: selectedOption,
				variant: newVariant,
				fuelCost: fuelCost,
				fuelCostInput: fuelCost
			},
			this.updateData
		);
	};

	updateData = () => {
		const { variant } = this.state;

		/* Calculations */
		var years = this.state.years;
		var miles = this.state.miles;
		var payment = this.state.payment;
		var depreciationRate = this.state.depreciationRate;
		var interestRate = this.state.interestRate;
		var fuelCost = this.state.fuelCost;

		/* Subventions */
		var subvention = tcoSubventions(variant);

		/* Tax */
		var taxYear = tcoTaxYear(variant);
		var malusYear = tcoMalusYear(variant);
		var malusTotal = tcoMalusTotal(variant, years);
		var taxTotal = tcoTaxTotal(variant, years);
		var taxYearTotal = taxYear * years;

		/* Fuel */
		var fuel = tcoFuel(variant, fuelCost, years, miles);

		/* depreciation */
		var depreciation = tcoDepreciation(variant, depreciationRate);

		/* Interest */
		var interest = tcoInterest(variant, interestRate, payment, years);

		/* Maintanence */
		var maintenanceYear = this.state.maintenanceYear;
		var maintenanceTotal = tcoMaintenanceTotal(variant, years, maintenanceYear);

		/* Insurance */
		var insuranceYear = this.state.insuranceYear;
		var insuranceTotal = tcoInsuranceTotal(variant, years, insuranceYear);


		/* TCO total */
		var tco = tcoTotal(
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

		//console.log(fuel);

		this.setState({
			variant: variant,
			insuranceYear: parseFloat(insuranceYear),
			maintenanceYear: parseFloat(maintenanceYear),
			insuranceTotal: parseInt(insuranceTotal.toFixed(0)),
			maintenanceTotal: parseInt(maintenanceTotal.toFixed(0)),
			malusYear: parseInt(malusYear.toFixed(0)),
			malusTotal: parseInt(malusTotal.toFixed(0)),
			subvention: parseInt(subvention.toFixed(0)),
			fuel: parseInt(fuel.toFixed(0)),
			depreciation: parseInt(depreciation.toFixed(0)),
			taxYear: parseInt(taxYear.toFixed(0)),
			taxTotal: parseInt(taxTotal.toFixed(0)),
			taxYearTotal: parseInt(taxYearTotal.toFixed(0)),
			fuelCost: parseFloat(fuelCost),
			interest: parseInt(interest.toFixed(0)),
			tcoTotal: parseInt(tco)
		});
	};

	render() {
		const { car, variant, variants } = this.state;
		var bonus = null;
		var bonusTooltip = null;
		if (!this.state.dataLoading) {
			bonus =
				variant.emissions.value <= 70 &&
				(variant.type.swe === "El" || variant.type.swe === "Laddhybrid") ? (
					<span>
						<img
							className="img-fluid bonus-icon"
							data-for="bonus-icon"
							data-tip="Miljöbonus"
							src={bonusIcon}
							alt="Miljöbil"
						/>
					</span>
				) : null;
			bonusTooltip =
				variant.emissions.value <= 70 &&
				(variant.type.swe === "El" || variant.type.swe === "Laddhybrid") ? (
					<ReactTooltip
						id="bonus-icon"
						className="tooltip"
						textColor="white"
						backgroundColor="black"
						effect="solid"
					/>
				) : null;
			var fuelTypeLabel = null;
			var fuelsLabel = null;
			if(variant.type.swe === "Laddhybrid"){
				fuelTypeLabel = variant.type.types.swe[0];
				fuelsLabel = variant.type.types.swe[0]+"/"+variant.type.types.swe[1];;
			}else{
				fuelTypeLabel = variant.type.swe;
				fuelsLabel = variant.type.swe;
			}
		}

		return (
			<div>
				{this.state.dataLoading ? (
					false
				) : (
					<Container className="padding-section car-details">
						<Row>
							<Col md="12" className="mx-auto">
								<Card className="card-container">
									<Container>
										<Row>
											<Col md="12" lg="7" className="pr-md-0 p-0">
												<CardImg
													className="img-fluid detail-img"
													src={require("../assets/images/cars/" + car.image)}
												/>
											</Col>
											<Col
												md="12"
												lg="5"
												className="mx-auto border-bottom border-light"
											>
												<Row className="h-100">
													<div className="d-flex align-items-center justify-content-center w-100">
														<Col md="12" className="px-4 pt-4 pb-0">
															<Row className="mx-auto">
																<Col md="12" className="text-center pb-2">
																	<h3 className="car-details-title">
																		{car.brand} {car.model}
																	</h3>
																</Col>
																<Col md="12" lg="10" className="mx-auto pb-3">
																	<Select
																		blurInputOnSelect={true}
																		isSearchable={false}
																		className="filter-select border"
																		classNamePrefix="filter-option"
																		value={this.state.selectedOption}
																		onChange={this.updateVariant}
																		options={variants.map(variant => {
																			return {
																				label: variant.variant,
																				value: variant.variant
																			};
																		})}
																	/>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Inköpspris</h6>
																	<p className="p-0 mb-3">
																		{numFormatter(variant.price.value)}{" "}
																		{variant.price.unit}
																	</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Motoreffekt</h6>
																	<p className="p-0 mb-3">
																		{numFormatter(variant.engine.hk)} hk (
																		{numFormatter(variant.engine.kw)} kW)
																	</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Drivmedel</h6>
																	<p className="p-0 mb-3">{fuelsLabel}</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Bränslekonsumtion</h6>
																	<p className="p-0 mb-3">
																		{variant.fuel.value} {variant.fuel.unit}/100
																		km
																	</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Växellåda</h6>
																	<p className="p-0 mb-3">
																		{variant.transmission.swe}
																	</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>Storleksklass</h6>
																	<p className="p-0 mb-3">{car.size.swe}</p>
																</Col>
																<Col xs="6" md="4" lg="6">
																	<h6>CO2-utsläpp</h6>

																	<p className="p-0">
																		{variant.emissions.value}{" "}
																		{variant.emissions.unit}
																		{bonus}
																	</p>
																	{bonusTooltip}
																</Col>
															</Row>
														</Col>
													</div>
												</Row>
											</Col>
										</Row>
										<Row>
											<Col
												lg="4"
												className="px-4 py-3  bg-light order-lg-last tco-variables"
											>
												<Row>
													<Col className="p-2">
														<h6>Kalkylnamn</h6>
														<Row>
															<Col xs="7">
																<input
																	type="text"
																	className="form-control"
																	value={this.state.calculationName}
																	onChange={this.handleNameChange}
																	onKeyPress={this.handleKeyPress}
																/>
															</Col>
															<Col className="p-0">
																<Button
																	pill
																	onClick={this.saveCalculation}
																	theme="dark"
																	size="md"
																>
																	Spara kalkyl
																</Button>
															</Col>
														</Row>
													</Col>
												</Row>
												<Row>
													<Col xs="6" className="calculation-input">
														<h6>Längd (år)</h6>
														<div>
															<input
																type="number"
																value={this.state.yearsInput}
																onChange={this.changeYearsInput}
																className="form-control"
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>Körsträcka (mil/år)</h6>
														<div>
															<input
																type="number"
																value={this.state.milesInput}
																onChange={this.changeMilesInput}
																className="form-control"
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>
															Kontantinsats <span>(%)</span>
														</h6>
														<div>
															<input
																type="number"
																max="100"
																value={this.state.paymentInput}
																onChange={this.changePaymentInput}
																className="form-control"
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>
															Ränta <span>(%)</span>
														</h6>
														<div>
															<input
																type="number"
																value={this.state.interestRateInput}
																onChange={this.changeInterestInput}
																className="form-control"
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>
															{fuelTypeLabel}pris{" "}
															<span>{"(kr/" + variant.fuel.unit + ")"}</span>
														</h6>
														<div>
															<input
																type="number"
																onChange={this.changeFuelInput}
																value={this.state.fuelCostInput}
																className="form-control"
															/>
														</div>
													</Col>

													<Col xs="6" className="calculation-input">
														<h6>
															Värdeminskning <span>(%)</span>
														</h6>
														<div>
															<input
																type="number"
																value={this.state.depreciationRateInput}
																onChange={this.changeDepreciationInput}
																className="form-control"
															/>
														</div>
													</Col>

													<Col xs="6" className="calculation-input">
														<h6>
															Försäkring <span>(kr/år)</span>
														</h6>
														<div>
															<input
																type="number"
																className="form-control"
																value={this.state.insuranceInput}
																onChange={this.changeInsuranceInput}
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>
															Underhåll <span>(kr/år)</span>
														</h6>
														<div>
															<input
																type="number"
																className="form-control"
																value={this.state.maintenanceInput}
																onChange={this.changeMaintenanceInput}
															/>
														</div>
													</Col>
													<Col xs="6" className="calculation-input">
														<h6>
															Skatt <span>(kr/år) </span>
															<FontAwesomeIcon
																icon={faInfoCircle}
																color="black"
																data-for="tax"
																data-tip="Årlig fordonsskatt"
															/>
														</h6>
														<div>
															<input
																disabled
																type="number"
																min="0"
																className="form-control"
																value={this.state.taxYear}
															/>
															<ReactTooltip
																id="tax"
																className="tooltip"
																textColor="white"
																backgroundColor="black"
																effect="solid"
															/>
														</div>
													</Col>
												</Row>
												<Row>
													<div className="p-2 pt-3 d-flex">
														<Button
															pill
															onClick={this.resetVariabels}
															theme="danger"
															size="md"
														>
															Återställ
														</Button>
													</div>
												</Row>
											</Col>
											<Col lg="8" className="p-0">
												<Container className="p-4">
													<Card className="p-3">
														<Row>
															<Col xs="6" md="4" lg="3" className="mx-auto">
																<Card className="h-100 bg-dark justify-content-center text-center">
																	<span>
																		<strong className="text-white car-details-tco-ratio">
																			{numFormatter(this.getTCORatio()) + "%"}
																		</strong>
																		<FontAwesomeIcon
																icon={faInfoCircle}
																className="ml-1"
																color="white"
																data-for="tcoRatio"
																data-tip="Totalkostnad i förhållande till inköpspris"
															/>
															<ReactTooltip
																			id="tcoRatio"
																			className="tooltip"
																			textColor="white"
																			backgroundColor="black"
																			effect="solid"
																		/>
																	</span>
																</Card>
															</Col>

															<Col xs="6" md="4" lg="3" className="mx-auto">
																<h6>Totalkostnad</h6>
																<h4 className="m-0 py-1">
																	<strong>
																		{numFormatter(this.state.tcoTotal) + " kr"}
																	</strong>
																</h4>
															</Col>

															<Col xs="6" md="4" lg="3">
																<h6>Månadskostnad</h6>
																<p className="m-0 py-1">
																	{numFormatter(this.getMonthlyCost())}{" "}
																	{"kr/månad"}
																</p>
															</Col>
															<Col xs="6" md="4" lg="3">
																<h6>Milkostnad</h6>
																<p className="m-0 py-1">
																	{numFormatter(this.getMileCost())} {"kr/mil"}
																</p>
															</Col>
														</Row>
													</Card>

													<Row className="mt-3">
														<Col
															xs="12"
															className="p-2 pb-md-3 pb-0 text-center"
														>
															<h4>Kostnadsfördelning</h4>
														</Col>
														<Col md="6" lg="6" className="p-md-0 pb-4">
														<Col xs="12" className="h-100 p-0">
															<PieChart
																depreciation={this.state.depreciation}
																fuel={this.state.fuel}
																maintenance={this.state.maintenanceTotal}
																interest={this.state.interest}
																insurance={this.state.insuranceTotal}
																tax={this.state.taxTotal}
															/>
															</Col>
														</Col>
														<Col md="6" lg="6">
															<Row>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 m-0">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#0074D9"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Värdeminskning</h6>
																			<p className="car-details-cost">
																				{numFormatter(this.state.depreciation)}{" "}
																				{"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 m-0">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#111111"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Bränsle</h6>
																			<p className="car-details-cost">
																				{numFormatter(this.state.fuel)} {"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 m-0">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#85144b"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Lånekostnader</h6>
																			<p className="car-details-cost">
																				{numFormatter(this.state.interest)}{" "}
																				{"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 m-0">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#2ECC40"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Försäkring</h6>
																			<p className="car-details-cost">
																				{numFormatter(
																					this.state.insuranceTotal
																				)}{" "}
																				{"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 m-0">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#FF851B"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Underhåll</h6>
																			<p className="car-details-cost">
																				{numFormatter(
																					this.state.maintenanceTotal
																				)}{" "}
																				{"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6">
																	<Row className="pl-md-1 pl-4">
																		<Col xs="1" className="p-0 ">
																			<FontAwesomeIcon
																				icon={faSquare}
																				color="#FF4136"
																			/>
																		</Col>
																		<Col xs="11" className="pl-2">
																			<h6>Skatt</h6>
																			<p className="car-details-cost">
																				{numFormatter(this.state.taxYearTotal)}{" "}
																				{"kr"}
																			</p>
																		</Col>
																	</Row>
																</Col>
																<Col xs="6" className="pt-2 pb-0 pl-md-0">
																	<div className="card p-2 car-details-bonus">
																		<h6>
																			Bonus{" "}
																			<FontAwesomeIcon
																				icon={faInfoCircle}
																				color="black"
																				data-for="bonus"
																				data-tip="Bonus för miljöanpassade fordon med CO2-utsläpp upp till 70 g/km"
																			/>
																		</h6>
																		<p className="m-0">
																			{numFormatter(this.state.subvention)}{" "}
																			{"kr"}
																		</p>
																		<ReactTooltip
																			id="bonus"
																			className="tooltip"
																			textColor="white"
																			backgroundColor="black"
																			effect="solid"
																		/>
																	</div>
																</Col>
																<Col xs="6" className="pt-2 pb-0 pl-md-0">
																	<div className="card p-2 car-details-malus">
																		<h6>
																			Malus{" "}
																			<FontAwesomeIcon
																				icon={faInfoCircle}
																				color="white"
																				data-for="malus"
																				data-tip="Förhöjd fordonsskatt de första tre åren för bensin- och dieselbilar med CO2-utsläpp över 95 g/km"
																			/>
																		</h6>
																		<p className="m-0">
																			{numFormatter(this.state.malusTotal)}{" "}
																			{"kr"}
																		</p>
																		<ReactTooltip
																			id="malus"
																			className="tooltip"
																			textColor="white"
																			backgroundColor="black"
																			effect="solid"
																		/>
																	</div>
																</Col>
															</Row>
														</Col>
													</Row>
												</Container>
											</Col>
										</Row>
									</Container>
								</Card>
							</Col>
						</Row>
					</Container>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addCalculation: calculation =>
		dispatch({ type: "ADD_CALCULATION", payload: calculation })
});

export default connect(null, mapDispatchToProps)(CarDetails);
