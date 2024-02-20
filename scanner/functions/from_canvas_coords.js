function from_canvas_coords({x, y}) {
	const rect = canvas_bounding_client_rect;
	return {
		clientX: ~~(x / main_canvas.width * rect.width + rect.left),
		clientY: ~~(y / main_canvas.height * rect.height + rect.top),
	};
}