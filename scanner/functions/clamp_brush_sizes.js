function clamp_brush_sizes() {
		const max_size = 100;
		if (brush_size > max_size) {
			brush_size = max_size;
			show_error_message(`Brush size clamped to ${max_size}`);
		}
		if (pencil_size > max_size) {
			pencil_size = max_size;
			show_error_message(`Pencil size clamped to ${max_size}`);
		}
		if (stroke_size > max_size) {
			stroke_size = max_size;
			show_error_message(`Stroke size clamped to ${max_size}`);
		}
	}