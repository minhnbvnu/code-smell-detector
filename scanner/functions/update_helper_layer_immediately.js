function update_helper_layer_immediately() {
	// window.console && console.log("Update helper layer NOW");
	if (info_for_updating_pointer) {
		const rescale = info_for_updating_pointer.devicePixelRatio / devicePixelRatio;
		info_for_updating_pointer.clientX *= rescale;
		info_for_updating_pointer.clientY *= rescale;
		info_for_updating_pointer.devicePixelRatio = devicePixelRatio;
		pointer = to_canvas_coords(info_for_updating_pointer);
	}

	const scale = magnification * window.devicePixelRatio;

	if (!helper_layer) {
		helper_layer = new OnCanvasHelperLayer(0, 0, main_canvas.width, main_canvas.height, false, scale);
	}

	const margin = 15;
	const viewport_x = Math.floor(Math.max($canvas_area.scrollLeft() / magnification - margin, 0));
	// Nevermind, canvas, isn't aligned to the right in RTL layout!
	// const viewport_x =
	// 	get_direction() === "rtl" ?
	// 		// Note: $canvas_area.scrollLeft() can return negative numbers for RTL layout
	// 		Math.floor(Math.max(($canvas_area.scrollLeft() - $canvas_area.innerWidth()) / magnification + canvas.width - margin, 0)) :
	// 		Math.floor(Math.max($canvas_area.scrollLeft() / magnification - margin, 0));
	const viewport_y = Math.floor(Math.max($canvas_area.scrollTop() / magnification - margin, 0));
	const viewport_x2 = Math.floor(Math.min(viewport_x + $canvas_area.width() / magnification + margin*2, main_canvas.width));
	const viewport_y2 = Math.floor(Math.min(viewport_y + $canvas_area.height() / magnification + margin*2, main_canvas.height));
	const viewport_width = viewport_x2 - viewport_x;
	const viewport_height = viewport_y2 - viewport_y;
	const resolution_width = viewport_width * scale;
	const resolution_height = viewport_height * scale;
	if (
		helper_layer.canvas.width !== resolution_width ||
		helper_layer.canvas.height !== resolution_height
	) {
		helper_layer.canvas.width = resolution_width;
		helper_layer.canvas.height = resolution_height;
		helper_layer.canvas.ctx.disable_image_smoothing();
		helper_layer.width = viewport_width;
		helper_layer.height = viewport_height;
	}
	helper_layer.x = viewport_x;
	helper_layer.y = viewport_y;
	helper_layer.position();

	render_canvas_view(helper_layer.canvas, scale, viewport_x, viewport_y, true);

	if (thumbnail_canvas && $thumbnail_window.is(":visible")) {
		// The thumbnail can be bigger or smaller than the viewport, depending on the magnification and thumbnail window size.
		// So can the document.
		// Ideally it should show the very corner if scrolled all the way to the corner,
		// so that you can get a thumbnail of any location just by scrolling.
		// But it's impossible if the thumbnail is smaller than the viewport. You have to resize the thumbnail window in that case.
		// (And if the document is smaller than the viewport, there's no scrolling to indicate where you want to get a thumbnail of.)
		// It gets clipped to the top left portion of the viewport if the thumbnail is too small.

		// This works except for if there's a selection, it affects the scrollable area, and it shouldn't affect this calculation.
		// const scroll_width = $canvas_area[0].scrollWidth - $canvas_area[0].clientWidth;
		// const scroll_height = $canvas_area[0].scrollHeight - $canvas_area[0].clientHeight;

		// These padding terms are negligible in comparison to the margin reserved for canvas handles,
		// which I'm not accounting for (except for clamping below).
		const padding_left = parseFloat($canvas_area.css("padding-left"));
		const padding_top = parseFloat($canvas_area.css("padding-top"));
		const scroll_width = main_canvas.clientWidth + padding_left - $canvas_area[0].clientWidth;
		const scroll_height = main_canvas.clientHeight + padding_top - $canvas_area[0].clientHeight;
		// Don't divide by less than one, or the thumbnail with disappear off to the top/left (or completely for NaN).
		let scroll_x_fraction = $canvas_area[0].scrollLeft / Math.max(1, scroll_width);
		let scroll_y_fraction = $canvas_area[0].scrollTop / Math.max(1, scroll_height);
		// If the canvas is larger than the document view, but not by much, and you scroll to the bottom or right,
		// the margin for the canvas handles can lead to the thumbnail being cut off or even showing
		// just blank space without this clamping (due to the not quite accurate scrollable area calculation).
		scroll_x_fraction = Math.min(scroll_x_fraction, 1);
		scroll_y_fraction = Math.min(scroll_y_fraction, 1);

		let viewport_x = Math.floor(Math.max(scroll_x_fraction * (main_canvas.width - thumbnail_canvas.width), 0));
		let viewport_y = Math.floor(Math.max(scroll_y_fraction * (main_canvas.height - thumbnail_canvas.height), 0));

		render_canvas_view(thumbnail_canvas, 1, viewport_x, viewport_y, false); // devicePixelRatio?
	}
}