function getGradientParam(fill, opacity) {
	let gradient = getGradient(fill, opacity);
	return gradient ? `gradient: ${gradient}, ` : '';
}