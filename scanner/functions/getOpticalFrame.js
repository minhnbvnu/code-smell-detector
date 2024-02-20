function getOpticalFrame(canvasContext) {
	// Read the framecode pixels off the canvas and store them in an imgdata object
	const framecode = canvasContext.getImageData(1, 1, 2, 16);
	
	// Grab a reference to the underlying imgdata typedarray - may improve performance
	const id = framecode.data;

	// Allocate a buffer of 4 bytes
	const buffer = new ArrayBuffer(4);

	// Our final decoded frame will simply be an interpretation of the buffer as an unsigned 32-bit integer
	const frame = new Uint32Array(buffer);

	// Note that framecodes have reversed bit endianness; they're most significant bit first
	for (let i = 0, bitOffset = 31, len = id.length; i < len; i += 4, bitOffset -= 1) {
		const v = (id[i] + id[i + 1] + id[i + 2] + id[i + 3]) / 4;

		// If the framecode pixel is white, set the bit at the corresponding bit offset
		if (v > 125) {
			frame[0] |= 1 << bitOffset;
		}
	}
			
	return frame[0];				
}