function prepareNumberToFormatter(value, decimals) {
	return clearDelimitersAndLeadingZeros((parseFloat(value)).toFixed(decimals));
}