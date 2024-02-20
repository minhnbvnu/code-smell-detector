function draw_noncontiguous_fill(ctx, x, y, swatch){
	if (typeof swatch === "string") {
		const fill_rgba = get_rgba_from_color(swatch);
		draw_noncontiguous_fill_without_pattern_support(ctx, x, y, fill_rgba[0], fill_rgba[1], fill_rgba[2], fill_rgba[3]);
	} else {
		const source_canvas = ctx.canvas;
		const fill_canvas = make_canvas(source_canvas.width, source_canvas.height);
		draw_noncontiguous_fill_separately(source_canvas.ctx, fill_canvas.ctx, x, y);
		replace_colors_with_swatch(fill_canvas.ctx, swatch, 0, 0);
		ctx.drawImage(fill_canvas, 0, 0);
	}
}