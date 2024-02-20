function load_theme_from_text(fileText) {
	var cssProperties = parseThemeFileString(fileText);
	if (!cssProperties) {
		show_error_message(localize("Paint cannot open this file."));
		return;
	}
	applyCSSProperties(cssProperties, { recurseIntoIframes: true });

	window.themeCSSProperties = cssProperties;
	
	$G.triggerHandler("theme-load");
}