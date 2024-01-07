function tool_go(selected_tool, event_name) {
	update_fill_and_stroke_colors_and_lineWidth(selected_tool);

	if (selected_tool[event_name]) {
		selected_tool[event_name](main_ctx, pointer.x, pointer.y);
	}
	if (selected_tool.paint) {
		selected_tool.paint(main_ctx, pointer.x, pointer.y);
	}
}