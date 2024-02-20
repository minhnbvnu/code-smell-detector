function getGradientTypeFromAsset(xdColorAsset) {
	return xdColorAsset.gradientType === assets.RADIAL ? "RadialGradient" : "LinearGradient";
}