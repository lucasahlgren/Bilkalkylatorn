import React, { Component } from "react";

import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
  Collapse,
  Container
} from "shards-react";

import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { menuOpen: false };
	}

	menuOpen = () => {
		const open = this.state.menuOpen;

		this.setState({ menuOpen: !open });
	};

	render() {
		/* Current state */
		const open = this.state.menuOpen;
		const linkList = [
			{ label: "Sök", link: "/sok" },
			{ label: "Mina kalkyler", link: "/minakalkyler" },
			{ label: "Jämför", link: "/jamfor" },
			{ label: "Vad är TCO?", link: "/" },
			{ label: "Om verktyget", link: "/" }
		];

		return (
			<header className="header" data-open={open}>
				<Container className="p-4">
					<div className="d-flex">
						<div>
							<Link className="pr-3 logo navlink" to="/">
								TCO-kalkylatorn
							</Link>
						</div>
						<div className="desktop-nav pt-1">
							<Nav>
								{linkList.map(link => {
									return (
										<NavItem key={link.label}>
											<Link className="navlink px-3" to={link.link}>
												{link.label}
											</Link>
										</NavItem>
									);
								})}
							</Nav>
						</div>
					</div>
					<nav className="mobile-nav" data-open={open}>
						<ul>
							{linkList.map(link => {
								return (
									<li key={link.label}>
										<Link
											className="navlink p-0 pb-1"
											onClick={this.menuOpen}
											to={link.link}
										>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
					<div className="menu-trigger" onClick={this.menuOpen}>
						<span data-isclicked={open} className="menu-icon" />
					</div>
				</Container>
			</header>
		);
	}
}

export default Header;
