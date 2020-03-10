import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import { Container, Row, Col } from "shards-react";

import { Alert } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Compare from "./Compare";
import Header from "./Header";
import Home from "./Home";
import Search from "./Search";
import CarDetails from "./CarDetails";
import Footer from "./Footer";

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Container fluid className="App p-0 m-0 vh-100 vw-100">
				<Container>
					<Header />
				</Container>
				<TransitionGroup className="transition-group">
					<CSSTransition
						key={this.props.location.pathname}
						timeout={{ enter: 300, exit: 300 }}
						classNames="fade"
					>
						<section className="route-section">
							<Switch location={this.props.location}>
								<Route exact path="/" component={Home} />
								<Route
									exact
									path="/bil/:carId/:carBrand?/:carModel?"
									component={CarDetails}
								/>
								<Route exact path="/jamfor" component={Compare} />
								<Route exact path="/sok" component={Search} />
								<Route
									component={() => {
										return <Redirect to="/" />;
									}}
								/>
							</Switch>
						</section>
					</CSSTransition>
				</TransitionGroup>
			</Container>
		);
	}
}

export default withRouter(App);
