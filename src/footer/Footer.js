import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

export default class Footer extends Component {
	render() {
		return (
			<footer>
				<Container fluid className="p-0 m-0">
                    
					<p className="pt-3 text-center">© Lucas Ahlgren 2020</p>
                  
				</Container>
			</footer>
		);
	}
}
