function update_magnified_canvas_size() {
	$canvas.css("width", main_canvas.width * magnification);
	$canvas.css("height", main_canvas.height * magnification);

	update_canvas_rect();
}