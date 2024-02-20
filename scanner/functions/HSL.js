function HSL(h, s, l) {
		var color = [h, s, l];
		var dye = [0, 0, 0, 0];	// hsla tint

		getHue = function() {
			return color[0];
		}

		getSaturation = function() {
			return color[1];
		}

		getLightness = function() {
			return color[2];
		}

		setHue = function(h) {
			color[0] = h;
		}

		setSaturation = function(s) {
			color[1] = s;
		}

		setLightness = function(l) {
			color[2] = l;
		}

		setDye = function(hsla) {
			dye = hsla;
		}

		setHsl = function(h, s, l) {
			color = [h, s, l];
		}

		blendedRgb = function(color, dye) {
			var to_blend = goog.color.hslArrayToRgb(color);
			var blender = goog.color.hslToRgb(dye[0], dye[1], dye[2]);
			var factor = dye[3];
			var rgb = goog.color.blend(blender, to_blend, factor);

			return rgb;
		}

		stringify = function() {
			var rgb = blendedRgb(color, dye);
			return goog.color.rgbArrayToHex(rgb);
		}

		toRgb = function() {
			return blendedRgb(color, dye);
		}

		return {
			getHue: getHue,
			getSaturation: getSaturation,
			getLightness: getLightness,
			setHue: setHue,
			setSaturation: setSaturation,
			setLightness: setLightness,
			setDye: setDye,
			setHsl: setHsl,
			toString: stringify,
			toRgb: toRgb
		}
	}