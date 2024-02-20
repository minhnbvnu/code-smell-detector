function generateSwatches(style, colors, getSwatchClass) {
		var list = Arrays.map(colors, function (color) {
			return (
				isColor(color)
					? '<div class="' + getSwatchClass(color) + '" '
						+ 'style="background-color: ' + color + '" '
						+ 'title="' + color + '"></div>'
					: '<div class="' + getSwatchClass(color) + ' '
						+ color + '"></div>'
			);
		});
		list.push(
			'<div class="removecolor" title="'
				+ i18n.t('remove-textcolor-' + style)
				+ '">&#10006</div></td>'
		);
		return list;
	}