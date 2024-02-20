function isShorthand(a, b) {
	const longhands = shorthandData[a] || [];

	return longhands.includes(b);
}