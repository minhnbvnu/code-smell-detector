function resize_canvas_and_save_dimensions(unclamped_width, unclamped_height, undoable_meta={}) {
	resize_canvas_without_saving_dimensions(unclamped_width, unclamped_height, undoable_meta);
	storage.set({
		width: main_canvas.width,
		height: main_canvas.height,
	}, (/*error*/) => {
		// oh well
	})
}