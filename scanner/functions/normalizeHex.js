function normalizeHex(color) {
		if (7 === color.length) {
			return color;
		}
		var r = color.substr(1, 1);
		var g = color.substr(2, 1);
		var b = color.substr(3, 1);
		return '#' + r + r + g + g + b + b;
	}