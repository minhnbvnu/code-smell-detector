function RGB_HSV (r, g, b) {
			r /= 255;
			g /= 255;
			b /= 255;
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if (m === 0) { return [ null, 0, 100 * v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [
				60 * (h===6?0:h),
				100 * (m/v),
				100 * v
			];
		}