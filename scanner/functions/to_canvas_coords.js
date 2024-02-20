function to_canvas_coords({clientX, clientY}) {
	if (clientX === undefined || clientY === undefined) {
		throw new TypeError("clientX and clientY must be defined (not {x, y} or x, y or [x, y])");
	}
	const rect = canvas_bounding_client_rect;
	return {
		x: ~~((clientX - rect.left) / rect.width * main_canvas.width),
		y: ~~((clientY - rect.top) / rect.height * main_canvas.height),
	};
}