function draw_polygon_or_line_strip(ctx, points, stroke, fill, close_path) {
		if (!gl) {
			show_error_message("Failed to get WebGL context. You may need to refresh the web page, or restart your computer.");
			return; // @TODO: don't pollute brush cache with empty brushes (also maybe fallback to 2D canvas rendering)
		}

		// this must be before stuff is done with op_canvas
		// otherwise update_brush_for_drawing_lines calls render_brush calls draw_ellipse calls draw_polygon calls draw_polygon_or_line_strip
		// trying to use the same op_canvas
		// (also, avoiding infinite recursion by checking for stroke; assuming brushes will never have outlines)
		if (stroke && stroke_size > 1) {
			update_brush_for_drawing_lines(stroke_size);
		}

		const stroke_color = ctx.strokeStyle;
		const fill_color = ctx.fillStyle;

		const numPoints = points.length;
		const numCoords = numPoints * 2;

		if (numPoints === 0) {
			return;
		}

		let x_min = +Infinity;
		let x_max = -Infinity;
		let y_min = +Infinity;
		let y_max = -Infinity;
		for (const { x, y } of points) {
			x_min = Math.min(x, x_min);
			x_max = Math.max(x, x_max);
			y_min = Math.min(y, y_min);
			y_max = Math.max(y, y_max);
		}
		x_max += 1;
		y_max += 1;
		x_min -= 1;
		y_min -= 1;

		op_canvas_webgl.width = x_max - x_min;
		op_canvas_webgl.height = y_max - y_min;
		gl.viewport(0, 0, op_canvas_webgl.width, op_canvas_webgl.height);

		const coords = new Float32Array(numCoords);
		for (let i = 0; i < numPoints; i++) {
			coords[i * 2 + 0] = (points[i].x - x_min) / op_canvas_webgl.width * 2 - 1;
			coords[i * 2 + 1] = 1 - (points[i].y - y_min) / op_canvas_webgl.height * 2;
			// @TODO: investigate: does this cause resolution/information loss? can we change the coordinate system?
		}

		if (fill) {
			const contours = [coords];
			const polyTriangles = triangulate(contours);
			let numVertices = initArrayBuffer(polyTriangles);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, numVertices);

			op_canvas_2d.width = op_canvas_webgl.width;
			op_canvas_2d.height = op_canvas_webgl.height;

			op_ctx_2d.drawImage(op_canvas_webgl, 0, 0);
			replace_colors_with_swatch(op_ctx_2d, fill_color, x_min, y_min);
			ctx.drawImage(op_canvas_2d, x_min, y_min);
		}
		if (stroke) {
			if (stroke_size > 1) {
				const stroke_margin = ~~(stroke_size * 1.1);

				const op_canvas_x = x_min - stroke_margin;
				const op_canvas_y = y_min - stroke_margin;

				op_canvas_2d.width = x_max - x_min + stroke_margin * 2;
				op_canvas_2d.height = y_max - y_min + stroke_margin * 2;
				for (let i = 0; i < numPoints - (close_path ? 0 : 1); i++) {
					const point_a = points[i];
					const point_b = points[(i + 1) % numPoints];
					// Note: update_brush_for_drawing_lines way above
					draw_line_without_pattern_support(
						op_ctx_2d,
						point_a.x - op_canvas_x,
						point_a.y - op_canvas_y,
						point_b.x - op_canvas_x,
						point_b.y - op_canvas_y,
						stroke_size
					);
				}

				replace_colors_with_swatch(op_ctx_2d, stroke_color, op_canvas_x, op_canvas_y);
				ctx.drawImage(op_canvas_2d, op_canvas_x, op_canvas_y);
			} else {
				let numVertices = initArrayBuffer(coords);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.drawArrays(close_path ? gl.LINE_LOOP : gl.LINE_STRIP, 0, numVertices);

				op_canvas_2d.width = op_canvas_webgl.width;
				op_canvas_2d.height = op_canvas_webgl.height;

				op_ctx_2d.drawImage(op_canvas_webgl, 0, 0);
				replace_colors_with_swatch(op_ctx_2d, stroke_color, x_min, y_min);
				ctx.drawImage(op_canvas_2d, x_min, y_min);
			}
		}
	}