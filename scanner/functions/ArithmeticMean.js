function ArithmeticMean(data) {
	numerator_total = Total(data);
	denominator_total = Total(data.length);
	return DivideIfPossibleOrZero(numerator_total, denominator_total);
}