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
import "./SearchForm.css";

class SearchForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("Hej searchform");
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md="8" className="mx-auto">
						<Form className="search-form py-4 pb-5">
							<Row>
								<Col md="12" className="mx-auto pt-4">
									<div className="search-bar">
										<input
											className="search-field"
											type="text"
											placeholder="Skriv bilmodell"
										/>
										<div className="icon">
											<svg
												version="1.1"
												width="25"
												height="25"
												viewBox="0 0 25 25"
											>
												<path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z"></path>
											</svg>
										</div>
									</div>
								</Col>
							</Row>

							<div className="advanced-search">
								<Row md="8">
									<Col className="d-flex">
										<div className="input-select flex-grow-1">
											<select data-trigger="" className="advanced-filter">
												<option placeholder="" value="">
													Bilmärke
												</option>
												<option>Volvo</option>
												<option>Tesla</option>
												<option>Volkswagen</option>
											</select>
										</div>

										<div className="input-select flex-grow-1">
											<select data-trigger="" className="advanced-filter">
												<option placeholder="" value="">
													Modell
												</option>
												<option>XC40</option>
												<option>Model 3</option>
												<option>Model S</option>
											</select>
										</div>

										<div className="input-select flex-grow-1">
											<select data-trigger="" className="advanced-filter">
												<option placeholder="" value="">
													Drivmedel
												</option>
												<option>El</option>
												<option>Bensin</option>
												<option>Diesel</option>
											</select>
										</div>

										<div className="input-select flex-grow-1">
											<select data-trigger="" className="advanced-filter">
												<option placeholder="" value="">
													Storlek
												</option>
												<option>Coupé</option>
												<option>SUV</option>
												<option>Kombi</option>
											</select>
										</div>
									</Col>
								</Row>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default SearchForm;
