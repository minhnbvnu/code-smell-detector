function GenColors(steps) {
	if (!steps) {
		steps = 6
	}

	const red = new Color(182, 70, 157)
	const yellow = new Color(221, 203, 85)
	const blue = new Color(0, 130, 201) // Nextcloud blue

	const palette1 = mixPalette(steps, red, yellow)
	const palette2 = mixPalette(steps, yellow, blue)
	const palette3 = mixPalette(steps, blue, red)

	return palette1.concat(palette2).concat(palette3)
}