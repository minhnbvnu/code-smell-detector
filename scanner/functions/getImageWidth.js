function getImageWidth($img) {
		var width;

		if (typeof $img.attr('width') !== 'undefined') {
			width = parseInt($img.attr('width'), 10);
		} else {
			// NOTE: this assumes the image has already loaded!
			width = parseInt($img.width(), 10);
		}

		if (typeof width === 'number' && !isNaN(width)) {
			width += 'px';
		} else {
			width = 'auto';
		}

		return width;
	}