function getThemeCSSProperties(element) {
	const keys = [
		"--checker",
		"--button-active-border-image",
		"--button-normal-border-image",
		"--inset-deep-border-image",
		"--button-default-border-image",
		"--button-default-active-border-image",
		"--scrollbar-arrows-ButtonText",
		"--scrollbar-arrows-GrayText",
		"--scrollbar-arrows-ButtonHilight",
		"--scrollbar-size",
		"--scrollbar-button-inner-size",
		"--ActiveBorder",
		"--ActiveTitle",
		"--AppWorkspace",
		"--Background",
		"--ButtonAlternateFace",
		"--ButtonDkShadow",
		"--ButtonFace",
		"--ButtonHilight",
		"--ButtonLight",
		"--ButtonShadow",
		"--ButtonText",
		"--GradientActiveTitle",
		"--GradientInactiveTitle",
		"--GrayText",
		"--Hilight",
		"--HilightText",
		"--HotTrackingColor",
		"--InactiveBorder",
		"--InactiveTitle",
		"--InactiveTitleText",
		"--InfoText",
		"--InfoWindow",
		"--Menu",
		"--MenuText",
		"--Scrollbar",
		"--TitleText",
		"--Window",
		"--WindowFrame",
		"--WindowText",
	];
	const style = window.getComputedStyle(element);
	const result = {};
	for (const key of keys) {
		result[key] = style.getPropertyValue(key);
	}
	return result;
}