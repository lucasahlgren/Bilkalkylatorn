import React, { Component } from "react";
import { connect } from "react-redux";

/* Scroll bar */
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { motion, AnimatePresence } from "framer-motion"

import { Container, Row, Col, Card, Button } from "shards-react";
import CSV from "./CSV";
import CalculationItem from "./CalculationItem"

class CalculationsList extends Component {
	select = (e) => {
		var selected = e.target.getAttribute("data-selected");
		var newSelected = false;
		console.log(selected);
		if(selected === true){
			newSelected = true;

		} else{
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
		return (
			<div>
				<h4 className="text-center">Kalkyler</h4>
				<SimpleBar
					className="px-3"
					autoHide={false}
					forceVisible="y"
					style={{ height: "66vh" }}
				>
					{list}
				</SimpleBar>
				<div className="pt-3 text-center">
					<CSV calculationsList={this.props.calculationsList} />
				</div>
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
