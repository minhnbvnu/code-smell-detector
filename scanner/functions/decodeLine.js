function decodeLine(value) {
	const [a, b, c] = value.substring(1, value.length - 1).split(',');
	return {
		a: a,
		b: b,
		c: c,
	};
}