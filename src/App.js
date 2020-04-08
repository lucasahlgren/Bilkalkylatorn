import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import { Container, Row, Col } from "shards-react";

import { Alert } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Compare from "./compare/Compare";
import Header from "./header/Header";
import Home from "./home/Home";
import Search from "./search/Search";
import CarDetails from "./car_details/CarDetails";
import MyCalculations from "./my_calculations/MyCalculations";
import Footer from "./footer/Footer";
import Toast from "./toast/Toast";
import About from "./about/About";

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Container fluid className="App p-0 m-0">
				<Header />
				<Toast />
				<TransitionGroup className="transition-group">
					<CSSTransition
						key={this.props.location.pathname}
						timeout={{ enter: 225, exit: 300 }}
						classNames="fade"
					>
						<section className="route-section">
							<Switch location={this.props.location}>
								<Route exact path="/" component={Home} />
								<Route exact path="/minakalkyler" component={MyCalculations} />
								<Route
									exact
									path="/bil/:carId/:carBrand?/:carModel?"
									component={CarDetails}
								/>
								<Route exact path="/jamfor" component={Compare} />
								<Route exact path="/sok" component={Search} />
								<Route exact path="/omverktyget" component={About} />
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
