function keyed(code, isDown) {

		if (keys[code]) {
			keys[code].wasDown = keys[code].isDown;
			keys[code].isDown = isDown;
		}

		if (isDown) {
			input.lastKey = code;
			input.lastKeyTime = Date.now();
		}

	}