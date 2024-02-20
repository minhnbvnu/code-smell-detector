function fix(num, digits=1) {
	let p = Math.pow(10, digits);
	num = Math.round(num * p) / p;
	return num + (num === (num|0) ? '.0' : '');
}