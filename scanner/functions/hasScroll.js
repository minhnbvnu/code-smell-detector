function hasScroll(el, index, match) {
		if (!el.style) {
			return false;
		}
		var $el = jQuery(el), sX = $el.css('overflow-x'), sY = $el
			.css('overflow-y'), hidden = 'hidden', visible = 'visible',
			scroll = 'scroll', axis = match[3];

		if (!axis) {
			if (sX === sY && (sY === hidden || sY === visible)) {
				return false;
			}
			if (sX === scroll || sY === scroll) {
				return true;
			}
		} else if (axis === 'x') {
			if (sX === hidden || sX === visible) {
				return false;
			}
			if (sX === scroll) {
				return true;
			}
		} else if (axis === 'y') {
			if (sY === hidden || sY === visible) {
				return false;
			}
			if (sY === scroll) {
				return true;
			}
		}

		// Compare client and scroll dimensions to see if a scrollbar is
		// needed

		return $el.innerHeight() < el.scrollHeight
				|| $el.innerWidth() < el.scrollWidth;
	}