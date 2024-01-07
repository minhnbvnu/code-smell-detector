function apply_image_transformation(meta, fn) {
	// Apply an image transformation function to either the selection or the entire canvas
	const original_canvas = selection ? selection.source_canvas : main_canvas;

	const new_canvas = make_canvas(original_canvas.width, original_canvas.height);

	const original_ctx = original_canvas.getContext("2d");
	const new_ctx = new_canvas.getContext("2d");

	fn(original_canvas, original_ctx, new_canvas, new_ctx);

	if (selection) {
		undoable({
			name: `${meta.name} (${localize("Selection")})`,
			icon: meta.icon,
			soft: true,
		}, () => {
			selection.replace_source_canvas(new_canvas);
		});
	} else {
		deselect();
		cancel();
		undoable({
			name: meta.name,
			icon: meta.icon,
		}, () => {
			saved = false;
			update_title();

			main_ctx.copy(new_canvas);

			$canvas.trigger("update"); // update handles
		});
	}
}