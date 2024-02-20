function draw_line_without_pattern_support(ctx, x1, y1, x2, y2, stroke_size = 1) {
	if(aliasing){
		if(stroke_size > 1){
			bresenham_line(x1, y1, x2, y2, (x, y) => {
				ctx.drawImage(line_brush_canvas, ~~(x - line_brush_canvas.width/2), ~~(y - line_brush_canvas.height/2));
			});
		}else{
			bresenham_line(x1, y1, x2, y2, (x, y) => {
				ctx.fillRect(x, y, 1, 1);
			});
		}
	}else{
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		
		ctx.lineWidth = stroke_size;
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.lineCap = "butt";
	}
}