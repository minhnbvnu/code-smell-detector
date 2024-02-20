function getARGBHexWithOpacity(color, opacity=1) {
	if (color == null) { return "00000000"; }
	return getColorComponent(color.a * opacity) +
		getColorComponent(color.r) +
		getColorComponent(color.g) +
		getColorComponent(color.b);
}