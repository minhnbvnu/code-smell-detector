function buildStripe(width) {
			if (stripes[width]) {
				return stripes[width];
			}
			var len = width,
				out = new Uint32Array(len);
			for (var i = 0; i < len; i += 4) {
				out[i    ] = 0x000000ff;
				out[i + 1] = 0x0000ff00;
				out[i + 2] = 0x00ff0000;
				out[i + 3] = 0xff000000;
			}
			return stripes[width] = new Uint8Array(out.buffer);
		}