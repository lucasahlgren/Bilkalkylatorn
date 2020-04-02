import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Calculation from "./Calculation";
import Excel from "../compare/Excel";

import { connect } from "react-redux";

/* Components */

class MyCalculations extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { calculationsList } = this.props;
		var content =
			calculationsList.length > 0
				? calculationsList.map(calculation => {
						return (
							<Calculation key={calculation.name} calculation={calculation} />
						);
				  })
				: null;
		return (
			<Container className="padding-section">
				<div className="p-md-4 p-2 h-100 ">
					<Row>
						<Col>
							<h4 className="text-center p-3 pb-2 title">
								<strong>Mina kalkyler</strong>
								<div className="pt-3 text-center">
									<Excel calculationsList={this.props.calculationsList} />
								</div>
							</h4>
						</Col>
					</Row>
					<Row>{content}</Row>
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
