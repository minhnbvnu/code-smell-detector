function dimensionCheck(el, callback) {
		var dimensions = {
			height: el.clientHeight,
			width: el.clientWidth
		};
		if (!dimensions.height && !dimensions.width) {
			setAttr(el, {
				'data-holder-invisible': true
			});
			callback.call(this, el);
		} else {
			el.removeAttribute('data-holder-invisible');
			return dimensions;
		}
	}