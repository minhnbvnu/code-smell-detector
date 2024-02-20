function getFrame(filmSprite, frameCanvas) {
	frameCanvas.copy(filmSprite, K_PROJECT_WIDTH + 1, 1, 2, K_FRAMECODE_BIT_DEPTH / 2, 0, 0);
	frameCanvas.update();

	let buffer, frame;
	if (K_FRAMECODE_BIT_DEPTH === 16) {
		buffer = new ArrayBuffer(2);
		frame = new Uint16Array(buffer);
	} else if (K_FRAMECODE_BIT_DEPTH === 32) {
		// Handle framecode bit depth of 32
	}

	let bitOffset = 0;

	for (let i = 0; i < frameCanvas.height; i += 1) {
		for (let j = 0; j < frameCanvas.width; j += 1) {
			const p = frameCanvas.getPixel(j, i); 

			if (p.r + p.g + p.b / 3 > 125) {
				frame[0] |= 1 << bitOffset;	
			}

			bitOffset += 1;
		}
	}

	return frame[0];
}