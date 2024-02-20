function draw_noncontiguous_fill_separately(source_ctx, dest_ctx, x, y) {
	x = Math.max(0, Math.min(Math.floor(x), source_ctx.canvas.width));
	y = Math.max(0, Math.min(Math.floor(y), source_ctx.canvas.height));
	const source_image_data = source_ctx.getImageData(0, 0, source_ctx.canvas.width, source_ctx.canvas.height);
	const dest_image_data = dest_ctx.getImageData(0, 0, dest_ctx.canvas.width, dest_ctx.canvas.height);
	const start_index = (y*source_image_data.width + x) * 4;
	const start_r = source_image_data.data[start_index+0];
	const start_g = source_image_data.data[start_index+1];
	const start_b = source_image_data.data[start_index+2];
	const start_a = source_image_data.data[start_index+3];
	
	find_color_globally(source_image_data, dest_image_data, start_r, start_g, start_b, start_a);
	
	dest_ctx.putImageData(dest_image_data, 0, 0);
}