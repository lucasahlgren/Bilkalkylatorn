import React, { Component } from "react";
import { Container, Row, Col, Card, Button, FormGroup, FormInput, Form, FormSelect } from "shards-react";
import { Link } from "react-router-dom";

class Search extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Row className="vh-75 d-flex justify-content-center mx-auto align-items-center">
                    <Col>
                    <h2 className="title text-center">
									<strong>Bilsök</strong>
					</h2>
					<Col className="mx-auto">
                        <Form>
                            <Row>
                            <Col md="6" className="mx-auto">
                    <FormGroup>
                        <FormInput>

                        </FormInput>
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <Row>
                        <Col md="2">
                    <FormSelect>
      <option value="first">This is the first option</option>
      <option value="second">This is the second option.</option>
      <option value="third" disabled>
        This option is disabled.
      </option>
    </FormSelect>
    </Col>
    <Col md="2">
    <FormSelect>
      <option value="first">This is the first option</option>
      <option value="second">This is the second option.</option>
      <option value="third" disabled>
        This option is disabled.
      </option>
    </FormSelect>
    </Col>
    </Row>
                    </FormGroup>
                    </Form>
                    </Col>
						
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Search;
