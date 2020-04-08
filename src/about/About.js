import React, { Component } from "react";
import { Container, Row, Col, Card, CardImg, CardTitle } from "shards-react";
import { Link } from "react-router-dom";

class About extends Component {
	render() {
		return (
			<Container fluid className="p-0 m-0 about">
				<div className="about-body p-0 m-0 grey-bg">
					<div className="about-header">
						<Container className="h-100 w-100 d-flex align-items-center justify-content-center">
							<Row className="m-0">
								<Col>
									<h2 className="title text-center">
										<strong>Om verktyget</strong>
									</h2>
								</Col>
							</Row>
						</Container>
					</div>

					<Container className="about-section">
						<Row>
							<Col md="10" className="mx-auto">
								<Col md="12" className="py-3">
									<h3>
										<strong>Vad är TCO?</strong>
									</h3>
									<p>
										Total Cost of Ownership (TCO) är en metod för att ta reda på
										en produkts totalkostnad under en begränsad innehavstid. För
										att beräkna totalkostnad behöver man identifiera relevanta
										kostnadsfaktorer för varje enskild produkt. I det här
										verktyget baseras detta på en modell framtagen för
										nybilsköpare och privatpersoner. Modellen består av sju
										kostnadsfaktorer som tillsammans utför den totala
										ägandekostnaden:
									</p>
									<ul>
										<li>Värdeminskning</li>
										<li>Bränsle</li>
										<li>Lånekostnader</li>
										<li>Försäkring</li>
										<li>Underhåll</li>
										<li>Skatt</li>
										<li>Subventioner</li>
									</ul>
								</Col>
								<Col md="12" className="py-3">
									<h3>
										<strong>Funktioner</strong>
									</h3>
									<p>
										I det här verktyget kan du skapa egna TCO-kalkyler utifrån
										dina förutsättningar. Det innebär att du kan anpassa
										faktorer såsom innehavstid, körsträcka samt kontantinsats
										och ränta i dina kalkyler. På jämförelsesidan kan du även jämföra
										dina kalkyler med varandra och på så sätt lära dig mer om
										kostnaderna mellan olika bilmodeller. Du kan även ladda ner
										dina kalkyler i en Excel-fil för vidare bearbetning senare.
									</p>
								</Col>
								<Col md="12" className="py-3">
									<h3>
										<strong>Beräkningar</strong>
									</h3>
									<p>
										Alla grundberäkningar (sökresultatet samt varje bils detaljsida) utgår från schablonvärden som
										är listade här under. Dessa värden kan finjusteras på varje
										bils detaljsida där man också kan skapa egna kalkyler.
									</p>
									<ul>
										<li>Innehavstid: 3 år</li>
										<li>Körsträcka: 1500 mil/år</li>
										<li>Kontantinsats: 20%</li>
										<li>Ränta: 5%</li>
										<li>Underhåll: 3000 kr/år</li>
										<li>Försäkring: 3000 kr/år</li>
										<li>Dieselpris: 15.9 kr/l</li>
										<li>Bensinpris: 15.6 kr/</li>
										<li>Elpris: 1.8 kr/kWh</li>
									</ul>
									<p>
										Skatt samt subventioner beräknas utifrån bilens
										koldioxidutsläpp baserat på information från
										Transportstyrelsen. Beräkningarna gäller fordon tagna i
										trafik under 2020 eller senare och inkluderar fordonsskatt
										samt bonus-malus. El- samt bränslepriser är hämtade från globalpetrolprices.com. Bilspecifikationerna är hämtade från respektive tillverkares hemsida.
									</p>
								</Col>
							</Col>
						</Row>
					</Container>
				</div>
			</Container>
		);
	}
}

export default About;
