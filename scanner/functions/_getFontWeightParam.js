function _getFontWeightParam(o) {
	let weight = _getFontWeight(o.fontStyle);
	return weight ? `fontWeight: ${weight}, ` : "";
}