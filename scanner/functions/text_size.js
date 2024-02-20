function text_size(width, height, template) {
	height = parseInt(height, 10);
	width = parseInt(width, 10);
	var bigSide = Math.max(height, width)
	var smallSide = Math.min(height, width)
	var scale = 1 / 12;
	var newHeight = Math.min(smallSide * 0.75, 0.75 * bigSide * scale);
	return {
		height: Math.round(Math.max(template.size, newHeight))
	}
}