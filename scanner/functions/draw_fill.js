function draw_fill(ctx, start_x, start_y, swatch) {
	if (typeof swatch === "string") {
		const fill_rgba = get_rgba_from_color(swatch);
		draw_fill_without_pattern_support(ctx, start_x, start_y, fill_rgba[0], fill_rgba[1], fill_rgba[2], fill_rgba[3]);
	} else {
		const source_canvas = ctx.canvas;
		const fill_canvas = make_canvas(source_canvas.width, source_canvas.height);
		draw_fill_separately(source_canvas.ctx, fill_canvas.ctx, start_x, start_y, 255, 255, 255, 255);
		replace_colors_with_swatch(fill_canvas.ctx, swatch, 0, 0);
		ctx.drawImage(fill_canvas, 0, 0);
	}
}