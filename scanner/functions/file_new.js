function file_new() {
	are_you_sure(() => {
		deselect();
		cancel();

		$G.triggerHandler("session-update"); // autosave old session
		new_local_session();

		reset_file();
		reset_selected_colors();
		reset_canvas_and_history(); // (with newly reset colors)
		set_magnification(default_magnification);

		$G.triggerHandler("session-update"); // autosave
	});
}