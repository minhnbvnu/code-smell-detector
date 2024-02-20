function decodeCircle(value) {
	const [point, radius] = value.substring(1, value.length - 1).split(/,(?![^(]*\))/);
	return {
		point: decodePoint(point),
		radius: radius,
	};
}