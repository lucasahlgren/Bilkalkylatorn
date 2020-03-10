import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import SliderCustomRange from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChargingStation,
	faPercentage,
	faGasPump,
	faBurn
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

/* Components */
import BarChart from "./BarChart";
import CalculationsList from "./CalculationsList";

class Compare extends Component {
	constructor(props) {
		super(props);

		this.state = {
			compareList: [],
			calculationsList: []
		};
	}

	render() {
		return (
			<Container className="padding-section">
				<Card className="p-md-4 p-2">
					<Row>
						<Col md="9" xs="11" className="mx-auto vh-75 vw-100">
							<BarChart />
						</Col>

						<Col md="3" className="options">
							<CalculationsList />
						</Col>
					</Row>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.compareList);
	console.log(state.calculationsList);
	return {
		compareList: state.compareList,
		calculationsList: state.calculationsList
	};
};

const mapDispatchToProps = dispatch => ({
	updateCompareList: list =>
		dispatch({ type: "UPDATE_COMPARELIST", payload: list })
});

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
