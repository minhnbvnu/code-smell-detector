function translatePath(d, xAxis, yAxis, xOffset, yOffset) {
	var len = d.length,
		i = 0;

	while (i < len) {
		if (typeof d[i] === 'number' && typeof d[i + 1] === 'number') {
			d[i] = xAxis.toPixels(d[i]) - xOffset;
			d[i + 1] = yAxis.toPixels(d[i + 1]) - yOffset;
			i += 2;
		} else {
			i += 1;
		}
	}

	return d;
}