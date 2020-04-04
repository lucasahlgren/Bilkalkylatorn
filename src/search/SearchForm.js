import React, { Component } from "react";
import data from "../data/data.json";
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
import Select from "react-select";

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBrandOption: [],
			selectedFuelOption: [],
			selectedSizeOption: []
		};
	}

	componentDidMount() {
		console.log("Hej searchform");
	}

	filterList = () => {
		const {
			selectedBrandOption,
			selectedFuelOption,
			selectedSizeOption
		} = this.state;
		console.log(selectedBrandOption);
		if (selectedBrandOption.length === 0 && selectedFuelOption.length === 0 && selectedSizeOption.length === 0) {
			this.props.updateList(data.cars);
			
		} else {
			var brands = selectedBrandOption.map(option => option.label);
			var fuels = selectedFuelOption.map(option => option.label);
			var sizes = selectedSizeOption.map(option => option.label);
			if(brands.length === 0){
				brands = this.getUniqueBrands()
			}
			if(fuels.length === 0){
				fuels = this.getUniqueFuels()
			}
			if(sizes.length === 0){
				sizes = this.getUniqueSizes()
			}
	
			var list = data.cars.filter(car => {
				var variants = car.variants;

				/* Fuel */
				var fuelsTypes = variants.map((variant) => {return variant.type.swe})
				var fuelTypeBool = false;
				console.log(fuelsTypes)
				console.log(fuels)
				fuelsTypes.map((fuel) => {if(fuels.includes(fuel)){
					fuelTypeBool = true;
				}
				})
				console.log(fuelTypeBool)

				/* Brands */
				var brandTypeBool = false;
				brandTypeBool = brands.includes(car.brand)
				console.log(brands)
				console.log(car.brand)
				console.log(brandTypeBool)


				
				/* Brands */
				var sizeTypeBool = false;
				sizeTypeBool = sizes.includes(car.size.swe)
				console.log(sizes)
				console.log(car.size.swe)
				console.log(sizeTypeBool)

				return brandTypeBool && fuelTypeBool && sizeTypeBool
			}
			);
			console.log(list);

			this.props.updateList(list);
		}
	};


	handleBrandChange = selectedBrandOption => {
		console.log(selectedBrandOption);
		if (selectedBrandOption === null) {
			this.setState({ selectedBrandOption: [] }, this.filterList);
		} else {
			this.setState({ selectedBrandOption }, this.filterList);
		}
	};

	handleFuelChange = selectedFuelOption => {
		if (selectedFuelOption === null) {
			this.setState({ selectedFuelOption: [] }, this.filterList);
		} else {
			this.setState({ selectedFuelOption }, this.filterList);
		}
	};

	handleSizeChange = selectedSizeOption => {
		if (selectedSizeOption === null) {
			this.setState({ selectedSizeOption: [] }, this.filterList);
		} else {
			this.setState({ selectedSizeOption }, this.filterList);
		}
	};

	getUniqueBrands = () => {
		var list = data.cars;
		const uniqueValues = (value, index, self) => {
			return self.indexOf(value) === index;
		};

		const brandValues = list.map(car => {
			return car.brand;
		});
		const uniqueBrands = brandValues.filter(uniqueValues);
		uniqueBrands.sort();
		console.log(uniqueBrands);
		return uniqueBrands;
	};

	getUniqueSizes = () => {
		var list = data.cars;
		const uniqueValues = (value, index, self) => {
			return self.indexOf(value) === index;
		};

		const sizeValues = list.map(car => {
			return car.size.swe;
		});
		const uniqueSizes = sizeValues.filter(uniqueValues);
		uniqueSizes.sort();
		console.log(uniqueSizes);
		return uniqueSizes;
	};

	getUniqueFuels = () => {
		var list = data.cars;
		const uniqueValues = (value, index, self) => {
			return self.indexOf(value) === index;
		};
		const fuelValues = [];
		list.map(car => {
			car.variants.map(variant => {
				fuelValues.push(variant.type.swe);
			});
		});
		const uniqueFuels = fuelValues.filter(uniqueValues);
		uniqueFuels.sort();
		console.log(uniqueFuels);
		return uniqueFuels;
	};

	createOptionsObject = (list) => {
		var options = list.map(option => {
			return { label: option, value: option.toLowerCase() };
		});
		return options
	}

	render() {

		var uniqueBrands = this.createOptionsObject(this.getUniqueBrands());
		var uniqueFuels = this.createOptionsObject(this.getUniqueFuels());
		var uniqueSizes = this.createOptionsObject(this.getUniqueSizes());

		return (
					<Card className="bg-light py-3">
						<Form className="search-form  px-3">
					
							<Row>
								<Col md="12">
								<h4 className="text-black text-center"><strong>Filter</strong></h4>
								</Col>
								<Col md="12" className="mx-auto pt-3">

									<div className="search-bar">
										<input
											className="search-field"
											type="text"
											placeholder="Sök bilmodell"
										/>
										<div className="search-icon">
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
								<Row>
									<Col md="12" className="d-flex flex-column">
										<div className="input-select flex-fill input-brand mb-1 mb-md-0">
											<Select
												blurInputOnSelect={true}
												isMulti
												isSearchable={false}
												placeholder="Bilmärke"
												className="filter-select"
												classNamePrefix="filter-option"
												value={this.state.selectedBrandOption}
												onChange={this.handleBrandChange}
												options={uniqueBrands}
												noOptionsMessage={() => {
													return "Inga fler alternativ";
												}}
											/>
										</div>

										<div className="input-select input-fuel mb-1 mb-md-0">
											<Select
												blurInputOnSelect={true} 
												isMulti
												isSearchable={false}
												placeholder="Drivmedel"
												className="filter-select"
												classNamePrefix="filter-option"
												value={this.state.selectedFuelOption}
												onChange={this.handleFuelChange}
												options={uniqueFuels}
												noOptionsMessage={() => {
													return "Inga fler alternativ";
												}}
											/>
										</div>

										<div className="input-select input-size">
											<Select
												blurInputOnSelect={true}
												isMulti
												isSearchable={false}
												placeholder="Storleksklass"
												className="filter-select"
												classNamePrefix="filter-option"
												value={this.state.selectedSizeOption}
												onChange={this.handleSizeChange}
												options={uniqueSizes}
												noOptionsMessage={() => {
													return "Inga fler alternativ";
												}}
											/>
										</div>
									</Col>
								</Row>
							</div>
						</Form>
						</Card>
		
		);
	}
}

export default SearchForm;
