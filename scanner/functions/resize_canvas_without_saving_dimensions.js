function resize_canvas_without_saving_dimensions(unclamped_width, unclamped_height, undoable_meta={}) {
	const new_width = Math.max(1, unclamped_width);
	const new_height = Math.max(1, unclamped_height);
	if (main_canvas.width !== new_width || main_canvas.height !== new_height) {
		undoable({
			name: undoable_meta.name || "Resize Canvas",
			icon: undoable_meta.icon || get_help_folder_icon("p_stretch_both.png"),
		}, () => {
			try {
				const image_data = main_ctx.getImageData(0, 0, new_width, new_height);
				main_canvas.width = new_width;
				main_canvas.height = new_height;
				main_ctx.disable_image_smoothing();
				
				if(!transparency){
					main_ctx.fillStyle = selected_colors.background;
					main_ctx.fillRect(0, 0, main_canvas.width, main_canvas.height);
				}

				const temp_canvas = make_canvas(image_data);
				main_ctx.drawImage(temp_canvas, 0, 0);
			} catch (exception) {
				if (exception.name === "NS_ERROR_FAILURE") {
					// or localize("There is not enough memory or resources to complete operation.")
					show_error_message(localize("Insufficient memory to perform operation."), exception);
				} else {
					show_error_message(localize("An unknown error has occurred."), exception);
				}
				// @TODO: undo and clean up undoable
				// maybe even keep Attributes dialog open if that's what's triggering the resize
				return;
			}

			$canvas_area.trigger("resize");
		});
	}
}