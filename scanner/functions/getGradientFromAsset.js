function getGradientFromAsset(xdColorAsset) {
	return `const ${getGradientTypeFromAsset(xdColorAsset)}(` +
		_getColorsParam(xdColorAsset.colorStops) +
	')';
}