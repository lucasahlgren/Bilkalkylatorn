import React, { Component } from "react";

/* Scroll bar */
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { Container, Row, Col, Card, Button } from "shards-react";
import CSV from "./CSV";

class CalculationsList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SimpleBar
				className="px-3"
				autoHide={false}
				forceVisible="y"
				style={{ height: "80vh" }}
			>
				<h4 className="text-center">Kalkyler</h4>
				<Card className="m-2">
					<p className="d-flex align-items-center justify-content-center">
						Kalkyl 1
					</p>
				</Card>
				<Card className="m-2">
					<p className="d-flex align-items-center justify-content-center">
						Kalkyl 2
					</p>
				</Card>
				<Card className="m-2">
					<p className="d-flex align-items-center justify-content-center">
						Kalkyl 3
					</p>
				</Card>
				<CSV />
			</SimpleBar>
		);
	}
}

export default CalculationsList;
