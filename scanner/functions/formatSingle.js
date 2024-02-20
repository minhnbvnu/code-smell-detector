function formatSingle(format, val) {
	var floatRegex = /f$/,
		decRegex = /\.([0-9])/,
		lang = defaultOptions.lang,
		decimals;

	if (floatRegex.test(format)) { // float
		decimals = format.match(decRegex);
		decimals = decimals ? decimals[1] : -1;
		val = numberFormat(
			val,
			decimals,
			lang.decimalPoint,
			format.indexOf(',') > -1 ? lang.thousandsSep : ''
		);
	} else {
		val = dateFormat(format, val);
	}
	return val;
}