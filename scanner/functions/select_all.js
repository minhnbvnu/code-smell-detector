function select_all() {
	deselect();
	select_tool(get_tool_by_id(TOOL_SELECT));

	undoable({
		name: localize("Select All"),
		icon: get_icon_for_tool(get_tool_by_id(TOOL_SELECT)),
		soft: true,
	}, () => {
		selection = new OnCanvasSelection(0, 0, main_canvas.width, main_canvas.height);
	});
}