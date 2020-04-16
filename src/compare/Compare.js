import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";

import { connect } from "react-redux";

/* Components */
import ChartContainer from "./ChartContainer";
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
			<Container className="compare padding-section">
				<Card className="p-md-4 p-2">
					<Row>
						<ChartContainer calculationsList={this.props.calculationsList} />
						<Col md="3" className="calculations-list mt-4 mt-md-0">
							<CalculationsList />
						</Col>
					</Row>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		calculationsList: state.tco.calculationsList
	};
};

export default connect(mapStateToProps, null)(Compare);
