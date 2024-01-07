function compute_bezier(t, start_x, start_y, control_1_x, control_1_y, control_2_x, control_2_y, end_x, end_y) {
	const mt = 1 - t;
	const mt2 = mt * mt;
	const t2 = t * t;
	let a, b, c, d = 0;

	a = mt2 * mt;
	b = mt2 * t * 3;
	c = mt * t2 * 3;
	d = t * t2;

	return {
		x: a * start_x + b * control_1_x + c * control_2_x + d * end_x,
		y: a * start_y + b * control_1_y + c * control_2_y + d * end_y
	};
}