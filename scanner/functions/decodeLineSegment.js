function decodeLineSegment(value) {
	const [a, b] = value.substring(1, value.length - 1).match(/\(.*?\)/g) || [];
	return {
		a: decodePoint(a),
		b: decodePoint(b),
	};
}