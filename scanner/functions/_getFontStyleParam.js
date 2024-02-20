function _getFontStyleParam(o) {
	let style = _getFontStyle(o.fontStyle);
	return style ? `fontStyle: ${style}, ` : "";
}