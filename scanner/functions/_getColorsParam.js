function _getColorsParam(arr, opacity) {
	let l = arr.length, stops = [], colors = [];
	for (let i=0; i<l; i++) {
		let s = arr[i];
		stops.push($.fix(s.stop, 3));
		colors.push(getColor(s.color, opacity));
	}
	return `colors: [${colors.join(", ")}], stops: [${stops.join(", ")}], `;
}