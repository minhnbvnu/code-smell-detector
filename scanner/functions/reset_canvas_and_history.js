function reset_canvas_and_history(){
	undos.length = 0;
	redos.length = 0;
	current_history_node = root_history_node = make_history_node({
		name: localize("New"),
		icon: get_help_folder_icon("p_blank.png"),
	});
	history_node_to_cancel_to = null;

	main_canvas.width = Math.max(1, my_canvas_width);
	main_canvas.height = Math.max(1, my_canvas_height);
	main_ctx.disable_image_smoothing();
	main_ctx.fillStyle = selected_colors.background;
	main_ctx.fillRect(0, 0, main_canvas.width, main_canvas.height);

	current_history_node.image_data = main_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);

	$canvas_area.trigger("resize");
	$G.triggerHandler("history-update"); // update history view
}