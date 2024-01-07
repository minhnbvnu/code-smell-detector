function deselect(going_to_history_node) {
	if (selection) {
		meld_selection_into_canvas(going_to_history_node);
	}
	if (textbox) {
		meld_textbox_into_canvas(going_to_history_node);
	}
	for (const selected_tool of selected_tools) {
		selected_tool.end && selected_tool.end(main_ctx);
	}
}