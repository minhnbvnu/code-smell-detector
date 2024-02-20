function multilineGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const lines = str.split('\n');
	const maxLength = Math.max.apply(null, lines.map(l => l.length).concat([gradient.stops.length]));
	const colors = getColors(gradient, options, maxLength);
	const results = [];
	for (const line of lines) {
		const lineColors = colors.slice(0);
		let lineResult = '';
		for (const l of line) {
			lineResult += chalk.hex(lineColors.shift().toHex())(l);
		}
		results.push(lineResult);
	}
	return results.join('\n');
}