function draw_bezier_curve_without_pattern_support(ctx, start_x, start_y, control_1_x, control_1_y, control_2_x, control_2_y, end_x, end_y, stroke_size) {
	const steps = 100;
	let point_a = { x: start_x, y: start_y };
	for (let t = 0; t < 1; t += 1 / steps) {
		const point_b = compute_bezier(t, start_x, start_y, control_1_x, control_1_y, control_2_x, control_2_y, end_x, end_y);
		// @TODO: carry "error" from Bresenham line algorithm between iterations? and/or get a proper Bezier drawing algorithm
		draw_line_without_pattern_support(ctx, point_a.x, point_a.y, point_b.x, point_b.y, stroke_size);
		point_a = point_b;
	}
}