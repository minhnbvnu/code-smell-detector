function get_brush_canvas_size(brush_size, brush_shape){
	// brush_shape optional, only matters if it's circle
	// @TODO: does it actually still matter? the ellipse drawing code has changed
	
	// round to nearest even number in order for the canvas to be drawn centered at a point reasonably
	return Math.ceil(brush_size * (brush_shape === "circle" ? 2.1 : 1) / 2) * 2;
}