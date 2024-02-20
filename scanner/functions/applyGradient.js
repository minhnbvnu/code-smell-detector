function applyGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const colorsCount = Math.max(str.replace(forbiddenChars, '').length, gradient.stops.length);
	const colors = getColors(gradient, options, colorsCount);
	let result = '';
	for (const s of str) {
		result += s.match(forbiddenChars) ? s : chalk.hex(colors.shift().toHex())(s);
	}
	return result;
}