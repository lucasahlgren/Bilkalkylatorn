import React, { Component } from "react";
import { connect } from "react-redux";

/* Scroll bar */
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { motion, AnimatePresence } from "framer-motion";

import { Container, Row, Col, Card, Button } from "shards-react";
import CSV from "./CSV";
import Excel from "./Excel";
import CalculationItem from "./CalculationItem";

class CalculationsList extends Component {
	select = e => {
		var selected = e.target.getAttribute("data-selected");
		var newSelected = false;
		console.log(selected);
		if (selected === true) {
			newSelected = true;
		} else {
			newSelected = false;
		}
		e.target.setAttribute("data-selected", newSelected);
	};

	render() {
		console.log(this.props);
		const { calculationsList } = this.props;
		const list =
			calculationsList.length > 0 ? (
				calculationsList.map(calculation => {
					return (
						<CalculationItem key={calculation.name} calculation={calculation} />
					);
				})
			) : (
				<p className="text-center">Inga sparade kalkyler</p>
			);

		var selectedCalculations = calculationsList.filter(
			calculation => calculation.selected === true
		);

		const excel =
			selectedCalculations.length != 0 ? (
				<div className="pt-2 text-center">
					<div className="p-2">
						Valda kalkyler:{" "}
						<span className="px-2 text-white rounded bg-dark">
							{selectedCalculations.length}
						</span>
					</div>
					<Excel disabled={false} calculationsList={selectedCalculations} />
				</div>
			) : (
				<div className="pt-2 text-center">
					<div className="p-2">
						Valda kalkyler:{" "}
						<span className="px-2 text-white rounded bg-dark">
							{selectedCalculations.length}
						</span>
					</div>
					<Excel disabled={true} calculationsList={selectedCalculations} />
				</div>
			);
		return (
			<div>
				<h4 className="text-center">Kalkyler</h4>
				<SimpleBar
					className="px-3"
					autoHide={false}
					forceVisible="y"
					style={{ height: "60vh" }}
				>
					{list}
				</SimpleBar>
				{excel}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		calculationsList: state.tco.calculationsList
	};
};

export default connect(mapStateToProps, null)(CalculationsList);
