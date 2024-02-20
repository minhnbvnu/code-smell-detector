function undoable({name, icon, use_loose_canvas_changes, soft}, callback){
	if (!use_loose_canvas_changes) {
		/* For performance (especially with two finger panning), I'm disabling this safety check that preserves certain document states in the history.
		const current_image_data = main_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);
		if (!current_history_node.image_data || !image_data_match(current_history_node.image_data, current_image_data, 5)) {
			window.console && console.log("Canvas image data changed outside of undoable", current_history_node, "current_history_node.image_data:", current_history_node.image_data, "document's current image data:", current_image_data);
			undoable({name: "Unknown [undoable]", use_loose_canvas_changes: true}, ()=> {});
		}
		*/
	}

	saved = false;
	update_title();

	const before_callback_history_node = current_history_node;
	callback && callback();
	if (current_history_node !== before_callback_history_node) {
		show_error_message(`History node switched during undoable callback for ${name}. This shouldn't happen.`);
		window.console && console.log(`History node switched during undoable callback for ${name}, from`, before_callback_history_node, "to", current_history_node);
	}

	const image_data = main_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);

	redos.length = 0;
	undos.push(current_history_node);

	const new_history_node = make_history_node({
		image_data,
		selection_image_data: selection && selection.canvas.ctx.getImageData(0, 0, selection.canvas.width, selection.canvas.height),
		selection_x: selection && selection.x,
		selection_y: selection && selection.y,
		textbox_text: textbox && textbox.$editor.val(),
		textbox_x: textbox && textbox.x,
		textbox_y: textbox && textbox.y,
		textbox_width: textbox && textbox.width,
		textbox_height: textbox && textbox.height,
		text_tool_font: JSON.parse(JSON.stringify(text_tool_font)),
		tool_transparent_mode,
		foreground_color: selected_colors.foreground,
		background_color: selected_colors.background,
		ternary_color: selected_colors.ternary,
		parent: current_history_node,
		name,
		icon,
		soft,
	});
	current_history_node.futures.push(new_history_node);
	current_history_node = new_history_node;

	$G.triggerHandler("history-update"); // update history view

	$G.triggerHandler("session-update"); // autosave
}