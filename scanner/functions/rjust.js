function rjust (string, width, chr) {
		var fill = '';
		while (fill.length < width - string.length) {
			fill += chr;
		}
		return fill + string;
	}