function decodeBox(value) {
	const [a, b] = value.match(/\(.*?\)/g) || [];
	return {
		a: decodePoint(a),
		b: decodePoint(b),
	};
}