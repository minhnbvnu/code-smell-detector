function make_monochrome_pattern(lightness, rgba1=[0, 0, 0, 255], rgba2=[255, 255, 255, 255]){

	const dither_threshold_table = Array.from({length: 64}, (_undefined, p) => {
		const q = p ^ (p >> 3);
		return (
			((p & 4) >> 2) | ((q & 4) >> 1) |
			((p & 2) << 1) | ((q & 2) << 2) |
			((p & 1) << 4) | ((q & 1) << 5)
		) / 64;
	});

	const pattern_canvas = document.createElement("canvas");
	const pattern_ctx = pattern_canvas.getContext("2d");

	pattern_canvas.width = 8;
	pattern_canvas.height = 8;

	const pattern_image_data = main_ctx.createImageData(pattern_canvas.width, pattern_canvas.height);

	for(let x = 0; x < pattern_canvas.width; x += 1){
		for(let y = 0; y < pattern_canvas.height; y += 1){
			const map_value = dither_threshold_table[(x & 7) + ((y & 7) << 3)];
			const px_white = lightness > map_value;
			const index = ((y * pattern_image_data.width) + x) * 4;
			pattern_image_data.data[index + 0] = px_white ? rgba2[0] : rgba1[0];
			pattern_image_data.data[index + 1] = px_white ? rgba2[1] : rgba1[1];
			pattern_image_data.data[index + 2] = px_white ? rgba2[2] : rgba1[2];
			pattern_image_data.data[index + 3] = (px_white ? rgba2[3] : rgba1[3]) ?? 255; // handling also 3-length arrays (RGB)
		}
	}

	pattern_ctx.putImageData(pattern_image_data, 0, 0);

	return main_ctx.createPattern(pattern_canvas, "repeat");
}