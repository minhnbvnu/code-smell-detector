function draw_quadratic_curve(ctx, start_x, start_y, control_x, control_y, end_x, end_y, stroke_size) {
	draw_bezier_curve(ctx, start_x, start_y, control_x, control_y, control_x, control_y, end_x, end_y, stroke_size);
}