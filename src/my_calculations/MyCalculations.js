import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Calculation from "./Calculation";
import Excel from "../compare/Excel";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

/* Components */

class MyCalculations extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { calculationsList } = this.props;
		var calculations =
			calculationsList.length > 0 ? (
				calculationsList.map(calculation => {
					return (
						<Calculation key={calculation.name} calculation={calculation} />
					);
				})
			) : (
				<Card className="p-md-4 mt-4 my-calculations-container w-100">
					<div className="justify-content-center d-flex align-items-center flex-column h-100 mx-auto">
						<p className="p-3">Inga sparade kalkyler</p>
					</div>
				</Card>
			);
		var buttons =
			calculationsList.length > 0 ? (
				<div className="p-0 text-center">
					<Excel calculationsList={this.props.calculationsList} />
					<Link to="/jamfor" className="mx-auto">
						<Button pill theme="light" size="md" className="ml-2">
							Jämför kalkyler
						</Button>
					</Link>
				</div>
			) : null;

		return (
			<Container className="padding-section">
				<div className="p-md-4 p-2 h-100 w-100">
					<Row>
						<Col>
							<h4 className="text-center pt-3 pb-2 mb-0 title">
								<strong>Mina kalkyler</strong>
							</h4>
							{buttons}
						</Col>
					</Row>
					<Row>{calculations}</Row>
				</div>
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

export default connect(mapStateToProps, null)(MyCalculations);
