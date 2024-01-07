function open_from_image_info(info, callback, canceled, into_existing_session, from_session_load) {
	are_you_sure(({ canvas_modified_while_loading } = {}) => {
		deselect();
		cancel();

		if (!into_existing_session) {
			$G.triggerHandler("session-update"); // autosave old session
			new_local_session();
		}

		reset_file();
		reset_selected_colors();
		reset_canvas_and_history(); // (with newly reset colors)
		set_magnification(default_magnification);

		main_ctx.copy(info.image || info.image_data);
		apply_file_format_and_palette_info(info);
		transparency = has_any_transparency(main_ctx);
		$canvas_area.trigger("resize");

		current_history_node.name = localize("Open");
		current_history_node.image_data = main_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);
		current_history_node.icon = get_help_folder_icon("p_open.png");

		if (canvas_modified_while_loading || !from_session_load) {
			// normally we don't want to autosave if we're loading a session,
			// as this is redundant, but if the user has modified the canvas while loading a session,
			// right now how it works is the session would be overwritten, so if you reloaded, it'd be lost,
			// so we'd better save it.
			// (and we want to save if this is a new session being initialized with an image)
			$G.triggerHandler("session-update"); // autosave
		}
		$G.triggerHandler("history-update"); // update history view

		if (info.source_blob instanceof File) {
			file_name = info.source_blob.name;
			// file.path is available in Electron (see https://www.electronjs.org/docs/api/file-object#file-object)
			system_file_handle = info.source_blob.path;
		}
		if (info.source_file_handle) {
			system_file_handle = info.source_file_handle;
		}
		saved = true;
		update_title();

		callback && callback();
	}, canceled, from_session_load);
}