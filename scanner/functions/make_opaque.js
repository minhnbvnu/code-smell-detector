function make_opaque() {
	undoable({
		name: "Make Opaque",
		icon: get_help_folder_icon("p_make_opaque.png"),
	}, () => {
		main_ctx.save();
		main_ctx.globalCompositeOperation = "destination-atop";

		main_ctx.fillStyle = selected_colors.background;
		main_ctx.fillRect(0, 0, main_canvas.width, main_canvas.height);

		// in case the selected background color is transparent/translucent
		main_ctx.fillStyle = "white";
		main_ctx.fillRect(0, 0, main_canvas.width, main_canvas.height);

		main_ctx.restore();
	});
}