function draw_ellipse(ctx, x, y, w, h, stroke, fill) {
	const center_x = x + w / 2;
	const center_y = y + h / 2;

	if (aliasing) {
		const points = [];
		const step = 0.05;
		for (let theta = 0; theta < TAU; theta += step) {
			points.push({
				x: center_x + Math.cos(theta) * w / 2,
				y: center_y + Math.sin(theta) * h / 2,
			});
		}
		draw_polygon(ctx, points, stroke, fill);
	} else {
		ctx.beginPath();
		ctx.ellipse(center_x, center_y, Math.abs(w / 2), Math.abs(h / 2), 0, TAU, false);
		ctx.stroke();
		ctx.fill();
	}
}