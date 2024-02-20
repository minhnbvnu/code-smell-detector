function tweenColors(from, to, pos) {
		var i = 4,
			rgba = [];

		while (i--) {
			rgba[i] = Math.round(
				to.rgba[i] + (from.rgba[i] - to.rgba[i]) * (1 - pos)
			);
		}
		return 'rgba(' + rgba.join(',') + ')';
	}