function update_fill_and_stroke_colors_and_lineWidth(selected_tool) {
	main_ctx.lineWidth = stroke_size;

	const reverse_because_fill_only = selected_tool.$options && selected_tool.$options.fill && !selected_tool.$options.stroke;
	main_ctx.fillStyle = fill_color =
		main_ctx.strokeStyle = stroke_color =
		selected_colors[
		(ctrl && selected_colors.ternary && pointer_active) ? "ternary" :
			((reverse ^ reverse_because_fill_only) ? "background" : "foreground")
		];

	fill_color_k =
		stroke_color_k =
		ctrl ? "ternary" : ((reverse ^ reverse_because_fill_only) ? "background" : "foreground");

	if (selected_tool.shape || selected_tool.shape_colors) {
		if (!selected_tool.stroke_only) {
			if ((reverse ^ reverse_because_fill_only)) {
				fill_color_k = "foreground";
				stroke_color_k = "background";
			} else {
				fill_color_k = "background";
				stroke_color_k = "foreground";
			}
		}
		main_ctx.fillStyle = fill_color = selected_colors[fill_color_k];
		main_ctx.strokeStyle = stroke_color = selected_colors[stroke_color_k];
	}
}