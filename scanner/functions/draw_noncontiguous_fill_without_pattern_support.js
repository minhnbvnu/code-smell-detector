function draw_noncontiguous_fill_without_pattern_support(ctx, x, y, fill_r, fill_g, fill_b, fill_a) {
	x = Math.max(0, Math.min(Math.floor(x), ctx.canvas.width));
	y = Math.max(0, Math.min(Math.floor(y), ctx.canvas.height));
	const image_data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const start_index = (y * image_data.width + x) * 4;
	const start_r = image_data.data[start_index + 0];
	const start_g = image_data.data[start_index + 1];
	const start_b = image_data.data[start_index + 2];
	const start_a = image_data.data[start_index + 3];

	replace_color_globally(image_data, start_r, start_g, start_b, start_a, fill_r, fill_g, fill_b, fill_a);

	ctx.putImageData(image_data, 0, 0);
}