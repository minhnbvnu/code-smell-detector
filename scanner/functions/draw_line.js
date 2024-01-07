function draw_line(ctx, x1, y1, x2, y2, stroke_size) {
	const min_x = Math.min(x1, x2);
	const min_y = Math.min(y1, y2);
	const max_x = Math.max(x1, x2);
	const max_y = Math.max(y1, y2);
	draw_with_swatch(ctx, min_x, min_y, max_x, max_y, stroke_color, op_ctx_2d => {
		draw_line_without_pattern_support(op_ctx_2d, x1, y1, x2, y2, stroke_size);
	});
	// also works:
	// draw_line_strip(ctx, [{ x: x1, y: y1 }, { x: x2, y: y2 }]);
}