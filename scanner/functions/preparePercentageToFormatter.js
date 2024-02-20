function preparePercentageToFormatter(value, decimals, modelMultiplier) {
	return PreFormatters.clearDelimitersAndLeadingZeros((parseFloat(value)*modelMultiplier).toFixed(decimals));
}