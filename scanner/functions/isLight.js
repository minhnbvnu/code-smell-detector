function isLight({ red, green, blue }) {
	const brightness = (((red * 299) + (green * 587) + (blue * 114)) / 1000)
	return (brightness > 130)
}