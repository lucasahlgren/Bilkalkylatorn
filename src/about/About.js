import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

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
										en produkts totalkostnad under en begränsad innehavstid. TCO
										är en viktig och användbar metod eftersom den anger vad du
										faktiskt betalar för produkten under innehavstiden. För att
										beräkna TCO behöver man identifiera relevanta
										kostnadsfaktorer för varje enskild produkt. I det här
										verktyget baseras detta på en modell framtagen för
										nybilsköpare och privatpersoner. Modellen består av sju
										kostnadsfaktorer som tillsammans utgör den totala
										ägandekostnaden:
									</p>
									<ul>
										<li>Värdeminskning (Inköpspris - andrahandsvärde)</li>
										<li>Bränsle</li>
										<li>Lånekostnader (Ränta)</li>
										<li>Försäkring</li>
										<li>Underhåll</li>
										<li>Skatt (Fordonsskatt)</li>
										<li>Subventioner (Bonus malus)</li>
									</ul>
								</Col>
								<Col md="12" className="py-3">
									<h3>
										<strong>Funktioner</strong>
									</h3>
									<p>
										I det här verktyget kan du göra samt spara egna TCO-kalkyler utifrån
										dina förutsättningar. Det innebär att du kan anpassa
										faktorer såsom innehavstid, körsträcka samt kontantinsats
										och ränta i dina kalkyler. På jämförelsesidan kan du jämföra
										dina kalkyler med varandra och på så sätt lära dig mer om
										kostnaderna mellan olika bilmodeller. Du kan bland annat
										jämföra totalkostnad, kostnadsfördelning samt enskilda
										kostnadsfaktorer. Om du vill spara och bearbeta dina kalkyler senare kan du dessutom
										ladda ner dem i en Excel-fil.
									</p>
								</Col>
								<Col md="12" className="py-3">
									<h3>
										<strong>Beräkningar</strong>
									</h3>
									<p>
										Alla grundberäkningar (sökresultatet på gör kalkyl-sidan samt beräkningen på varje bils
										detaljsida) utgår från schablonvärden som är listade här
										under. Dessa värden kan finjusteras på varje bils detaljsida.
									</p>
									<Row className="py-2">
										<Col sm="6">
											<h5>El</h5>
											<ul>
												<li>Innehavstid: 3 år</li>
												<li>Körsträcka: 1500 mil/år</li>
												<li>Kontantinsats: 20%</li>
												<li>Ränta: 5%</li>
												<li>Värdeminskning: 40%</li>
												<li>Underhåll: 1500 kr/år</li>
												<li>Försäkring: 3000 kr/år</li>
											</ul>
										</Col>
										<Col sm="6">
											<h5>Bensin/Diesel/Laddhybrid</h5>
											<ul>
												<li>Innehavstid: 3 år</li>
												<li>Körsträcka: 1500 mil/år</li>
												<li>Kontantinsats: 20%</li>
												<li>Ränta: 5%</li>
												<li>Värdeminskning: 50%</li>
												<li>Underhåll: 3000 kr/år</li>
												<li>Försäkring: 3000 kr/år</li>
											</ul>
										</Col>
									</Row>
									<Row>
									<Col sm="6">
											<h5>Bränslepriser</h5>
											<ul>
											<li>El: 1.8 kr/kWh</li>
												<li>Diesel: 15.9 kr/l</li>
												<li>Bensin: 15.6 kr/</li>
											</ul>
										</Col>
									</Row>
									<p>
										Skatt samt subventioner beräknas utifrån bilens
										koldioxidutsläpp baserat på information från
										Transportstyrelsen. Beräkningarna gäller fordon tagna i
										trafik under 2020 eller senare och inkluderar fordonsskatt
										samt bonus-malus. Bilspecifikationerna är hämtade från
										respektive tillverkares webbplats. El- samt bränslepriser är hämtade från
										globalpetrolprices.com. 
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
