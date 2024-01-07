function stretch_and_skew(x_scale, y_scale, h_skew, v_skew) {
	apply_image_transformation({
		name:
			(h_skew !== 0 || v_skew !== 0) ? (
				(x_scale !== 1 || y_scale !== 1) ? localize("Stretch and Skew") : localize("Skew")
			) : localize("Stretch"),
		icon: get_help_folder_icon(
			(h_skew !== 0) ? "p_skew_h.png" :
				(v_skew !== 0) ? "p_skew_v.png" :
					(y_scale !== 1) ? (
						(x_scale !== 1) ? "p_stretch_both.png" : "p_stretch_v.png"
					) : "p_stretch_h.png"
		),
	}, (original_canvas, original_ctx, new_canvas, new_ctx) => {
		const w = original_canvas.width * x_scale;
		const h = original_canvas.height * y_scale;

		let bb_min_x = +Infinity;
		let bb_max_x = -Infinity;
		let bb_min_y = +Infinity;
		let bb_max_y = -Infinity;
		const corner = (x01, y01) => {
			const x = Math.tan(h_skew) * h * x01 + w * y01;
			const y = Math.tan(v_skew) * w * y01 + h * x01;
			bb_min_x = Math.min(bb_min_x, x);
			bb_max_x = Math.max(bb_max_x, x);
			bb_min_y = Math.min(bb_min_y, y);
			bb_max_y = Math.max(bb_max_y, y);
		};

		corner(0, 0);
		corner(0, 1);
		corner(1, 0);
		corner(1, 1);

		const bb_x = bb_min_x;
		const bb_y = bb_min_y;
		const bb_w = bb_max_x - bb_min_x;
		const bb_h = bb_max_y - bb_min_y;

		new_canvas.width = Math.max(1, bb_w);
		new_canvas.height = Math.max(1, bb_h);
		new_ctx.disable_image_smoothing();

		if (!transparency) {
			new_ctx.fillStyle = selected_colors.background;
			new_ctx.fillRect(0, 0, new_canvas.width, new_canvas.height);
		}

		new_ctx.save();
		new_ctx.transform(
			1, // x scale
			Math.tan(v_skew), // vertical skew (skewY)
			Math.tan(h_skew), // horizontal skew (skewX)
			1, // y scale
			-bb_x, // x translation
			-bb_y // y translation
		);
		new_ctx.drawImage(original_canvas, 0, 0, w, h);
		new_ctx.restore();
	});
}