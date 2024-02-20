function setPositionStyleToFixed(surface) {
		if ($.browser.msie) {
			var $parent = surface.$element.parent();
			surface.$element.appendTo('body');
			surface.$element.css('position', POSITION_STYLE);
			if ($parent.length) {
				surface.$element.appendTo($parent);
			} else {
				surface.$element.detach();
			}
		} else {
			surface.$element.css('position', POSITION_STYLE);
		}
	}