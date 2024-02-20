function floatBelow($element, position, duration, callback) {
		position.top += DISTANCE;
		floatTo($element, position, duration, callback);
	}