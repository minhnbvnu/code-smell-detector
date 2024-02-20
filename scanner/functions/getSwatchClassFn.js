function getSwatchClassFn(style, colors) {
		var index = {};
		Arrays.forEach(colors, function (color, i) {
			index[TextColor.hex(color.toLowerCase())] = 'swatch-' + style + i;
		});
		return function getSwatchClass(color) {
			return (
				index[color]
					|| index[color.toLowerCase()]
						|| index[TextColor.hex(color)]
			);
		};
	}