function floatAbove($element, position, duration, callback) {
		position.top -= $element.height() + DISTANCE;
		floatTo($element, position, duration, callback);
	}