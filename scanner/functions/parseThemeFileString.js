function parseThemeFileString(themeIni) {
	// .theme is a renamed .ini text file
	// .themepack is a renamed .cab file, and parsing it as .ini seems to work well enough for the most part, as the .ini data appears in plain,
	// but it may not if compression is enabled for the .cab file
	var theme = parseINIString(themeIni);
	var colors = theme["Control Panel\\Colors"];
	if (!colors) {
		alert("Invalid theme file, no [Control Panel\\Colors] section");
		console.log(theme);
		return;
	}
	for (var k in colors) {
		// for .themepack file support, just ignore bad keys that were parsed
		if (k.match(/\W/)) {
			delete colors[k];
		} else {
			colors[k] = `rgb(${colors[k].split(" ").join(", ")})`;
		}
	}

	var cssProperties = {};
	for (var k in colors) {
		cssProperties[`--${k}`] = colors[k];
	}

	cssProperties = Object.assign(renderThemeGraphics(cssProperties), cssProperties);

	return cssProperties;
}