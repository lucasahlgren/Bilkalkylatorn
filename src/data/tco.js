export function tcodepreciation(variant, depreciationRate) {
	console.log("depreciation_____________________________________");
	const price = variant.price.value;
	var cost = (price * depreciationRate) / 100;
	return cost;
}

export function tcoFuel(variant, price, years, miles) {
	console.log("Fuel_____________________________________");
	const fuel = variant.fuel.value;
	var cost = (fuel / 10) * price * years * miles;
	return cost;
}

export function tcoInterest(variant, interestRate, payment, years) {
	console.log("Interest_____________________________________");
	if (payment === 100 || (interestRate === 0 && payment >= 0) || years === 0) {
		return 0;
	} else if (payment >= 0 && payment < 100) {
		const price = variant.price.value;
		var total = 0;
		var amountBorrowed = price * (1 - payment / 100);
		var months = 12 * years;
		var interestRateMonthly = interestRate / 100 / 12;

		//console.log("Borrowed: " + amountBorrowed);
		//console.log("Months: " + months);
		//console.log("Interest rate: " + interestRateMonthly);

		var compound = 1 - Math.pow(1 + interestRateMonthly, months * -1);
		total =
			(interestRateMonthly * amountBorrowed * months) / compound -
			amountBorrowed;

		//console.log(compound);
		console.log(total);
		return total;
	}
}

export function tcoTaxTotal(variant, years) {
	console.log("Total tax_____________________________________");
	const type = variant.type.swe;
	var total = 0;
	if ((type === "Bensin" || type === "Diesel") && years >= 3) {
		total = tcoMalus(variant) * 3 + tcoTaxYear(variant) * years;
		return total;
	} else if ((type === "Bensin" || type === "Diesel") && years < 3) {
		total = tcoMalus(variant) * years + tcoTaxYear(variant) * years;
		return total;
	} else {
		total = tcoTaxYear(variant) * years;
		return total;
	}
}

export function tcoMalusTotal(variant, years){
	var type = variant.type.swe
	var total = 0;
	if ((type === "Bensin" || type === "Diesel") && years >= 3) {
		total = tcoMalus(variant) * 3;
		return total;
	} else if ((type === "Bensin" || type === "Diesel") && years < 3) {
		total = tcoMalus(variant) * years;
		return total;
	} else {
		return total;
	}

}

export function tcoTaxYear(variant) {
	const emissions = variant.emissions.value;
	const type = variant.type.swe;

	var total = 0;
	/* Grundbelopp för alla bilar */
	var baseAmount = 360;

	total += baseAmount;

	/* Koldioxidbaserad fordonsskatt */
	if (emissions > 111) {
		/* Koldioxidbelopp */
		var emissionsTax = 0;

		/* 22 per gram */
		if (
			type === "Etanol" ||
			type === "E85" ||
			type === "Biogas" ||
			type === "Naturgas"
		) {
			emissionsTax += 11 * (emissions - 111);
		} else {
			emissionsTax += 22 * (emissions - 111);
		}

		if (type === "Diesel") {
			/* Bränsletillägg */
			var fuelTax = emissions * 13.52;
			/* Miljötilägg  */
			var enviroTax = 250;

			total += fuelTax + emissionsTax + enviroTax;
			return total;
		} else {
			total += emissionsTax;
			return total;
		}
	} else {
		return total;
	}
}

export function tcoMalus(variant) {
	console.log("Malus_____________________________________");
	const emissions = variant.emissions.value;
	const type = variant.type.swe;

	/* Förhöjd fordonsskatt */
	var malus = 0;

	/* Malus */
	if ((type === "Diesel" || type === "Bensin") && emissions > 95) {
		/* Grundbelopp för alla bilar */
		var baseAmount = 360;

		/* Koldioxidbelopp */
		var emissionsTax = 0;

		if (type === "Diesel") {
			if (emissions <= 140) {
				/* 82 kr per gram */
				emissionsTax += 82 * (emissions - 95);
				//console.log(emissionsTax);
			}
			if (emissions > 140) {
				/* 82 per fram mellan 95-140 */
				emissionsTax += 82 * (140 - 95);

				/* 107 kr per gram */
				emissionsTax += 107 * (emissions - 140);
				//console.log(107 * (emissions - 140));
			}
			var fuelTax = emissions * 13.52;
			/* Miljötilägg  */
			var enviroTax = 250;

			malus = baseAmount + fuelTax + emissionsTax + enviroTax;

			var diff = malus - tcoTaxYear(variant);

			return diff;
		} else if (type === "Bensin") {
			if (emissions <= 140) {
				/* 82 kr per gram */
				emissionsTax += 82 * (emissions - 95);
				//console.log(emissionsTax);
			}
			if (emissions > 140) {
				/* 82 per fram mellan 95-140 */
				emissionsTax += 82 * (140 - 95);

				/* 107 kr per gram */
				emissionsTax += 107 * (emissions - 140);
				//console.log(107 * (emissions - 140));
			}

			malus = baseAmount + emissionsTax;

			var diff = malus - tcoTaxYear(variant);

			return diff;
		}
	} else {
		return malus;
	}
}

export function tcoInsurance(variant) {
	console.log("Insurance_____________________________________");
	var total = 2000;
	return total;
}

export function tcoMaintenance(variant) {
	console.log("Maintenance_____________________________________");
	var total = 2000;
	return total;
}

export function tcoSubventions(variant) {
	console.log("Subventions_____________________________________");
	/* Bonus */
	const emissions = variant.emissions.value;
	const price = variant.price.value;
	const type = variant.type.swe;

	if (type === "El" || type === "Laddhybrid") {
		if (emissions === 0) {
			if (60000 > price * 0.25) {
				return price * 0.25;
			} else {
				return 60000;
			}
		} else if (emissions <= 70) {
			var bonus = 60000 - 714 * emissions;
			if (bonus > price * 0.25) {
				return price * 0.25;
			} else {
				return bonus;
			}
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

export function numFormatter(num) {
	var fixedNum = num.toFixed(0);
	var parts = fixedNum.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
}

export function tcoFuelCost(type) {
	var fuel = type.toLowerCase();
	if (fuel === "el") {
		return 2;
	} else if (fuel === "bensin") {
		return 15.7;
	} else if (fuel === "diesel") {
		return 15.5;
	}
}
