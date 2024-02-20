function getDynamicRange(buffer) {
		var len = buffer.length;
		var min = 128;
		var max = 128;

		for (var i = 0; i < len; i++) {
			var instrument = buffer[i];
			if (instrument < min) min = instrument;
			else if (instrument > max) max = instrument
		}

		return (max - min) / 255
	}