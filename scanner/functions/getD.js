function getD(data, w, h, maxY) {
	/** @type {string[]} */
	let l = [];
	const maxX = data.length - 1;
	for (let i = 0; i <= maxX; i++) {
		l.push(round((i / maxX) * w) + ',' + round(h - (data[i] / maxY) * h));
	}
	return `M ${l.join(' L ')}`;
}