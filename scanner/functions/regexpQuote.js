function regexpQuote(str) {

	return str.replace(regexpReserved, '\\$1');
}