import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Card, Button } from "shards-react";

class CalculationItem extends Component {
	constructor(props) {
		super(props);
	}

	select = e => {
		var selected = e.currentTarget.getAttribute("data-selected");
		var calculationName = e.currentTarget.getAttribute("data-calculation");
		console.log(selected);
		console.log(calculationName);
		if (selected === "false") {
			this.props.addCompare(calculationName);
		} else {
			this.props.removeCompare(calculationName);
		}
	};

	removeCalculation = e => {
		var calculationName = e.target.getAttribute("data-calculation");
		console.log(calculationName);
		this.props.removeCalculation(calculationName);
	};

	render() {
		const { calculation } = this.props;
		console.log(calculation);
		return (
			<Card
				data-selected={calculation.selected}
				className="calculation-item m-2"
			>
				<div className="d-flex justify-content-between">
					<div
						className="px-3 py-2 flex-fill"
						onClick={this.select}
						data-calculation={calculation.name}
						data-selected={calculation.selected}
					>
						<span className="m-0">{calculation.name}</span>
					</div>
					<button
						data-calculation={calculation.name}
						onClick={this.removeCalculation}
					>
						X
					</button>
				</div>
			</Card>
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
		dispatch({ type: "REMOVE_CALCULATION", payload: calculationName }),
	addCompare: calculationName =>
		dispatch({ type: "ADD_COMPARE", payload: calculationName }),
	removeCompare: calculationName =>
		dispatch({ type: "REMOVE_COMPARE", payload: calculationName })
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculationItem);
