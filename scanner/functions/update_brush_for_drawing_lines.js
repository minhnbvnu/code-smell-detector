function update_brush_for_drawing_lines(stroke_size){
	if(aliasing && stroke_size > 1){
		line_brush_canvas = get_brush_canvas("circle", stroke_size);
	}
}