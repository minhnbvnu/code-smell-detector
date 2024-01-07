function draw_bezier_curve(ctx, start_x, start_y, control_1_x, control_1_y, control_2_x, control_2_y, end_x, end_y, stroke_size) {
	// could calculate bounds of Bezier curve with something like bezier-js
	// but just using the control points should be fine
	const min_x = Math.min(start_x, control_1_x, control_2_x, end_x);
	const min_y = Math.min(start_y, control_1_y, control_2_y, end_y);
	const max_x = Math.max(start_x, control_1_x, control_2_x, end_x);
	const max_y = Math.max(start_y, control_1_y, control_2_y, end_y);
	draw_with_swatch(ctx, min_x, min_y, max_x, max_y, stroke_color, op_ctx_2d => {
		draw_bezier_curve_without_pattern_support(op_ctx_2d, start_x, start_y, control_1_x, control_1_y, control_2_x, control_2_y, end_x, end_y, stroke_size);
	});
}