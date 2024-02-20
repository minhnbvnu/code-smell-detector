function set_magnification(new_scale, anchor_point) {
	// anchor_point is optional, and uses canvas coordinates;
	// the default is the top-left of the $canvas_area viewport

	// How this works is, you imagine "what if it was zoomed, where would the anchor point be?"
	// Then to make it end up where it started, you simply shift the viewport by the difference.
	// And actually you don't have to "imagine" zooming, you can just do the zoom.

	anchor_point = anchor_point ?? {
		x: $canvas_area.scrollLeft() / magnification,
		y: $canvas_area.scrollTop() / magnification,
	};
	const anchor_on_page = from_canvas_coords(anchor_point);

	magnification = new_scale;
	if (new_scale !== 1) {
		return_to_magnification = new_scale;
	}
	update_magnified_canvas_size(); // also updates canvas_bounding_client_rect used by from_canvas_coords()
	
	const anchor_after_zoom = from_canvas_coords(anchor_point);
	// Note: scrollBy() not scrollTo()
	$canvas_area[0].scrollBy({
		left: anchor_after_zoom.clientX - anchor_on_page.clientX,
		top: anchor_after_zoom.clientY - anchor_on_page.clientY,
		behavior: "instant",
	});

	$G.triggerHandler("resize"); // updates handles & grid
	$G.trigger("option-changed"); // updates options area
}