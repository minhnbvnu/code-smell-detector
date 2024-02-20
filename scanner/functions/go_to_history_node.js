function go_to_history_node(target_history_node, canceling, discard_document_state) {
	const from_history_node = current_history_node;

	if (!target_history_node.image_data) {
		if (!canceling) {
			show_error_message("History entry has no image data.");
			window.console && console.log("Target history entry has no image data:", target_history_node);
		}
		return;
	}
	/* For performance (especially with two finger panning), I'm disabling this safety check that preserves certain document states in the history.
	const current_image_data = main_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);
	if (!current_history_node.image_data || !image_data_match(current_history_node.image_data, current_image_data, 5)) {
		window.console && console.log("Canvas image data changed outside of undoable", current_history_node, "current_history_node.image_data:", current_history_node.image_data, "document's current image data:", current_image_data);
		undoable({name: "Unknown [go_to_history_node]", use_loose_canvas_changes: true}, ()=> {});
	}
	*/
	current_history_node = target_history_node;
	
	deselect(true);
	if (!canceling) {
		cancel(true);
	}
	saved = false;
	update_title();

	main_ctx.copy(target_history_node.image_data);
	if (target_history_node.selection_image_data) {
		if (selection) {
			selection.destroy();
		}
		// @TODO maybe: could store whether a selection is from Free-Form Select
		// so it selects Free-Form Select when you jump to e.g. Move Selection
		// (or could traverse history to figure it out)
		if (target_history_node.name === localize("Free-Form Select")) {
			select_tool(get_tool_by_id(TOOL_FREE_FORM_SELECT));
		} else {
			select_tool(get_tool_by_id(TOOL_SELECT));
		}
		selection = new OnCanvasSelection(
			target_history_node.selection_x,
			target_history_node.selection_y,
			target_history_node.selection_image_data.width,
			target_history_node.selection_image_data.height,
			target_history_node.selection_image_data,
		);
	}
	if (target_history_node.textbox_text != null) {
		if (textbox) {
			textbox.destroy();
		}
		// @# text_tool_font =
		for (const [k, v] of Object.entries(target_history_node.text_tool_font)) {
			text_tool_font[k] = v;
		}
		
		selected_colors.foreground = target_history_node.foreground_color;
		selected_colors.background = target_history_node.background_color;
		tool_transparent_mode = target_history_node.tool_transparent_mode;
		$G.trigger("option-changed");

		select_tool(get_tool_by_id(TOOL_TEXT));
		textbox = new OnCanvasTextBox(
			target_history_node.textbox_x,
			target_history_node.textbox_y,
			target_history_node.textbox_width,
			target_history_node.textbox_height,
			target_history_node.textbox_text,
		);
	}

	const ancestors_of_target = get_history_ancestors(target_history_node);

	undos = [...ancestors_of_target];
	undos.reverse();

	const old_history_path =
		redos.length > 0 ?
			[redos[0], ...get_history_ancestors(redos[0])] :
			[from_history_node, ...get_history_ancestors(from_history_node)];

	// window.console && console.log("target_history_node:", target_history_node);
	// window.console && console.log("ancestors_of_target:", ancestors_of_target);
	// window.console && console.log("old_history_path:", old_history_path);
	redos.length = 0;

	let latest_node = target_history_node;
	while (latest_node.futures.length > 0) {
		const futures = [...latest_node.futures];
		futures.sort((a, b)=> {
			if(old_history_path.indexOf(a) > -1) {
				return -1;
			}
			if(old_history_path.indexOf(b) > -1) {
				return +1;
			}
			return 0;
		});
		latest_node = futures[0];
		redos.unshift(latest_node);
	}
	// window.console && console.log("new undos:", undos);
	// window.console && console.log("new redos:", redos);

	$canvas_area.trigger("resize");
	$G.triggerHandler("session-update"); // autosave
	$G.triggerHandler("history-update"); // update history view
}