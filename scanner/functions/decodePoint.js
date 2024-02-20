function decodePoint(value) {
	const [x, y] = value.substring(1, value.length - 1).split(',');
	if (Number.isNaN(parseFloat(x)) || Number.isNaN(parseFloat(y))) {
		throw new Error(`Invalid point value: "${Number.isNaN(parseFloat(x)) ? x : y}"`);
	}
	return {
		x: x,
		y: y,
	};
}