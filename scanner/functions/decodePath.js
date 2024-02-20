function decodePath(value) {
	const points = value.substring(1, value.length - 1).split(/,(?![^(]*\))/);
	return points.map(decodePoint);
}