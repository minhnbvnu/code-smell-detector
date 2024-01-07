function inheritTheme(target, source) {
	applyCSSProperties(getThemeCSSProperties(source), { element: target, recurseIntoIframes: true });
}