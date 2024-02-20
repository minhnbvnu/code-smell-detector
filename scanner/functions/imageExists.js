function imageExists(src, callback) {
		var image = new Image();
		image.onerror = function() {
			callback.call(this, false);
		};
		image.onload = function() {
			callback.call(this, true);
		};
		image.src = src;
	}