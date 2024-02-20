function getLinearGradient(gradient, id) {
	const stops = gradient
		.map((s) => `<stop stop-color="${s.color}" offset="${s.offset}" />`)
		.join('');

	return (
		`<linearGradient id="${id}" x1="0" x2="0" y1="100%" y2="0" gradientUnits="userSpaceOnUse">` +
		stops +
		`</linearGradient>`
	);
}