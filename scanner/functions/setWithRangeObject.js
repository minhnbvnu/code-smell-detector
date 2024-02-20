function setWithRangeObject(command, rangeObject, formatFn) {
		if (!enabled) {
			return;
		}
		set(command, Dom.rangeFromRangeObject(rangeObject), function (command, range) {
			var rangeObject = rangeObjectFromRange(range);
			formatFn(command, rangeObject);
			Dom.setRangeFromRef(range, rangeObject);
		});
		// Because without doing rangeObject.select(), the
		// next insertText command (see editable.js) will
		// not be reached and instead the browsers default
		// insert behaviour will be applied (which doesn't
		// know anything about state overrides). I don't
		// know the exact reasons why; probably some
		// stopPropagation somewhere by some plugin.
		rangeObject.select();
	}