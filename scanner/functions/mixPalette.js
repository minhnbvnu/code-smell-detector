function mixPalette(steps, color1, color2) {
	const palette = []
	palette.push(color1)
	const step = stepCalc(steps, [color1, color2])
	for (let i = 1; i < steps; i++) {
		const r = parseInt(color1.r + step[0] * i, 10)
		const g = parseInt(color1.g + step[1] * i, 10)
		const b = parseInt(color1.b + step[2] * i, 10)
		palette.push(new Color(r, g, b))
	}
	return palette
}