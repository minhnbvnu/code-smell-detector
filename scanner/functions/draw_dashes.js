function draw_dashes(ctx, x, y, go_x, go_y, scale, translate_x, translate_y) {
		if (!vertical_pattern) {
			horizontal_pattern_canvas.ctx.fillStyle = "white";
			horizontal_pattern_canvas.ctx.fillRect(4, 0, 4, 4);
			vertical_pattern_canvas.ctx.fillStyle = "white";
			vertical_pattern_canvas.ctx.fillRect(0, 4, 4, 4);
			horizontal_pattern = ctx.createPattern(horizontal_pattern_canvas, "repeat");
			vertical_pattern = ctx.createPattern(vertical_pattern_canvas, "repeat");
		}

		const dash_width = 1;
		const hairline_width = 1 / scale; // size of a screen pixel

		ctx.save();

		ctx.scale(scale, scale);
		ctx.translate(translate_x, translate_y);

		ctx.translate(x, y);
		ctx.globalCompositeOperation = "difference";


		if (go_x > 0) {
			const matrix = svg_for_creating_matrices.createSVGMatrix();
			if (horizontal_pattern.setTransform) { // not supported by Edge as of 2019-12-04
				horizontal_pattern.setTransform(matrix.translate(-x, -y).translate(hairline_width, 0).scale(1 / scale));
			}
			ctx.fillStyle = horizontal_pattern;
			ctx.fillRect(0, 0, go_x, dash_width);
		} else if (go_y > 0) {
			const matrix = svg_for_creating_matrices.createSVGMatrix();
			if (vertical_pattern.setTransform) { // not supported by Edge as of 2019-12-04
				vertical_pattern.setTransform(matrix.translate(-x, -y).translate(0, hairline_width).scale(1 / scale));
			}
			ctx.fillStyle = vertical_pattern;
			ctx.fillRect(0, 0, dash_width, go_y);
		}
		ctx.restore();
	}