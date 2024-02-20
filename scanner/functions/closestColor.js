function closestColor(hex, opt = {}) {
	const options = { ...defaults, ...opt }
	const sortedColors = sortBy(colors, c => proximity(hex, c.hex))
	if (options.detailed) {
		return sortedColors[0]
	}
	return sortedColors[0].name
}