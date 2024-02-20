function getStyleMap(styleString) {
	var styles = {};
	if (!styleString) {
		return styles;
	}
	var styleArray = styleString.split(';');
	for (var i=0; i<styleArray.length; i++) {
		var tmp = styleArray[i].split(':');
		var tmpKey = processStyleKey(tmp[0].trim());
		styles[tmpKey] = processStyleValue(tmp[1]);
	}
	return styles;
}