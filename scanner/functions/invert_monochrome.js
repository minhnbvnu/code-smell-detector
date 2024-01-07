function invert_monochrome(source_ctx, dest_ctx = source_ctx, monochrome_info = detect_monochrome(source_ctx)) {
	const image_data = source_ctx.getImageData(0, 0, source_ctx.canvas.width, source_ctx.canvas.height);
	// Note: values in pixel_array may be different on big endian vs little endian machines.
	// Only rely on equality of values within the array.
	// pixel_array is a performance optimization, to access whole pixels at a time instead of individual color channels.
	const pixel_array = new Uint32Array(image_data.data.buffer);
	if (monochrome_info.presentNonTransparentUint32s.length === 0) {
		// Fully transparent.
		// No change, and no need to copy the image to dest canvas to represent that lack of a change.
		return;
	}
	if (monochrome_info.presentNonTransparentUint32s.length === 1) {
		// Only one non-transparent color present in the image.
		// Can't use just the information of what colors are in the canvas to invert, need to look at the palette.
		// We could've done this in a unified way, but whatever!
		// Personally, I think this is a CHARMINGLY poor solution.
		// Maybe a little less so now that I added handling for transparency (i.e. Free-Form Select).
		const color_1 = palette[0];
		const color_2 = palette[14] || palette[1];
		const color_1_rgba = get_rgba_from_color(color_1);
		const present_rgba = monochrome_info.presentNonTransparentRGBAs[0];
		if (
			present_rgba[0] === color_1_rgba[0] &&
			present_rgba[1] === color_1_rgba[1] &&
			present_rgba[2] === color_1_rgba[2] &&
			present_rgba[3] === color_1_rgba[3]
		) {
			dest_ctx.fillStyle = color_2;
		} else {
			dest_ctx.fillStyle = color_1;
		}
		if (monochrome_info.monochromeWithTransparency) {
			dest_ctx.putImageData(image_data, 0, 0);
			dest_ctx.globalCompositeOperation = "source-in";
		}
		dest_ctx.fillRect(0, 0, source_ctx.canvas.width, source_ctx.canvas.height);
		return;
	}
	const [uint32_a, uint32_b] = monochrome_info.presentNonTransparentUint32s;
	for (let i = 0, len = pixel_array.length; i < len; i += 1) {
		if (pixel_array[i] === uint32_a) {
			pixel_array[i] = uint32_b;
		} else if (pixel_array[i] === uint32_b) {
			pixel_array[i] = uint32_a;
		}
	}
	dest_ctx.putImageData(image_data, 0, 0);
}