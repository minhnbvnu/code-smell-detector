function getXYByElement(el) {
		var left = 0,
		top = 0;

		while (el.offsetParent) {
			left += el.offsetLeft;
			top += el.offsetTop;
			el = el.offsetParent;
		}
		return {
			left: left,
			top: top
		};
	}