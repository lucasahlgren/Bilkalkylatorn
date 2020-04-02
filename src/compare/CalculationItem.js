import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Card, Button, Collapse } from "shards-react";

class CalculationItem extends Component {
	constructor(props) {
		super(props);
		this.state = { collapse: false };
	}

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};

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
						className="px-3 py-2 align-items-center flex-fill"
						onClick={this.select}
						data-calculation={calculation.name}
						data-selected={calculation.selected}
					>
						<span className="m-0">{calculation.name}</span>
					</div>
					<div className="pr-2 py-1">
						<FontAwesomeIcon
							onClick={this.toggle}
							data-collapse={this.state.collapse}
							className="expand-calculation-icon"
							size="2x"
							icon={faCaretDown}
						/>
						
					</div>
							
				</div>
				<Collapse open={this.state.collapse}>
					<div className="px-2 py-2 rounded">
						<ul className="list-group calculation-item-list">
							<li className="list-group-item px-2 p-1">
								{calculation.car.brand} {calculation.car.model}
							</li>
							<li className="list-group-item px-2 p-1">
								{calculation.variant.variant}
							</li>
							<li className="list-group-item px-2 p-1">
								{calculation.years} år
							</li>
							<li className="list-group-item px-2 p-1">
								{calculation.miles} mil/år
							</li>
							<li className="list-group-item px-2 p-1">
								Ränta: {calculation.interestRate} %
							</li>
							<li className="list-group-item px-2 p-1">
								Kontantinsats: {calculation.payment} %
							</li>
							<li className="list-group-item px-2 p-1">
								Värdeminskning: {calculation.depreciationRate} %
							</li>
						</ul>
					</div>
				</Collapse>
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
	addCompare: calculationName =>
		dispatch({ type: "ADD_COMPARE", payload: calculationName }),
	removeCompare: calculationName =>
		dispatch({ type: "REMOVE_COMPARE", payload: calculationName })
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculationItem);
