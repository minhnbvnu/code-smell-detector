function showDigits(num, digits = 2) {
	let toNum = parseFloat(num);
	let afterFixed = toNum.toFixed(digits);
	return afterFixed;
}