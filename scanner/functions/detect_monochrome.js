function detect_monochrome(ctx) {
	// Note: Brave browser, and DuckDuckGo Privacy Essentials browser extension
	// implement a privacy technique known as "farbling", which breaks this code.
	// (I've implemented workarounds in many places, but not here yet.)
	// This function currently returns the set of one or two colors if applicable,
	// and things outside would need to be changed to handle a "near-monochrome" state.

	const id = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const pixelArray = new Uint32Array(id.data.buffer); // to access as whole pixels (for greater efficiency & simplicity)
	// Note: values in pixelArray may be different on big endian vs little endian machines.
	// Use id.data, which is guaranteed to be in RGBA order, for getting color information.
	// Only use the Uint32Array for comparing pixel equality (faster than comparing each color component).
	const colorUint32s = [];
	const colorRGBAs = [];
	let anyTransparency = false;
	for(let i=0, len=pixelArray.length; i<len; i+=1){
		// @TODO: should this threshold not mirror has_any_transparency?
		// seems to have different notions of "any transparency"
		// has_any_transparency is "has any pixels not fully opaque"
		// detect_monochrome's anyTransparency means "has any pixels fully transparent"
		if (id.data[i*4+3] > 1) {
			if (!colorUint32s.includes(pixelArray[i])) {
				if (colorUint32s.length < 2) {
					colorUint32s.push(pixelArray[i]);
					colorRGBAs.push(id.data.slice(i*4, (i+1)*4));
				} else {
					return {isMonochrome: false};
				}
			}
		} else {
			anyTransparency = true;
		}
	}
	return {
		isMonochrome: true,
		presentNonTransparentRGBAs: colorRGBAs,
		presentNonTransparentUint32s: colorUint32s,
		monochromeWithTransparency: anyTransparency,
	};
}