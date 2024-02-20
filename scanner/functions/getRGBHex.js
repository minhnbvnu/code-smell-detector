function getRGBHex(color) {
	if (color == null) { return "000000"; }
	return getColorComponent(color.r) +
		getColorComponent(color.g) +
		getColorComponent(color.b);
}