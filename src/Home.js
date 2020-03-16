import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "shards-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container className="home-container padding-section">
				<Row className="vh-75 d-flex justify-content-center mx-auto align-items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<Col>
							<Row>
								<Col md="12" className="p-3">
									<h2 className="title text-center">
										<strong>Vad är bilens verkliga kostnad?</strong>
									</h2>
								</Col>
							</Row>
							<Row>
								<Col md="6" className="mx-auto p-3">
									<h5 className="title">
										I det här verktyget kan du ta reda på bilens total
										ägandekostnad. Utforska verktyget genom att klicka på
										knappen nedan.
									</h5>
								</Col>
							</Row>
							<Row>
								<Link to="/sok" className="mx-auto">
									
										<Button pill theme="light" size="lg">
											Starta
										</Button>
									
								</Link>
							</Row>
						</Col>
					</motion.div>
				</Row>
			</Container>
		);
	}
}

export default Home;
