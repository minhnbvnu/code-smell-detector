function render_brush(ctx, shape, size){
	// USAGE NOTE: must be called outside of any other usage of op_canvas (because of draw_ellipse)
	if(shape.match(/diagonal/)){
		size -= 0.4;
	}
	
	const mid_x = Math.round(ctx.canvas.width / 2);
	const left = Math.round(mid_x - size/2);
	const right = Math.round(mid_x + size/2);
	const mid_y = Math.round(ctx.canvas.height / 2);
	const top = Math.round(mid_y - size/2);
	const bottom = Math.round(mid_y + size/2);
	
	if(shape === "circle"){
		// @TODO: ideally _without_pattern_support
		draw_ellipse(ctx, left, top, size, size, false, true);
		// was useful for testing:
		// ctx.fillStyle = "red";
		// ctx.fillRect(mid_x, mid_y, 1, 1);
	}else if(shape === "square"){
		ctx.fillRect(left, top, ~~size, ~~size);
	}else if(shape === "diagonal"){
		draw_line_without_pattern_support(ctx, left, top, right, bottom);
	}else if(shape === "reverse_diagonal"){
		draw_line_without_pattern_support(ctx, left, bottom, right, top);
	}else if(shape === "horizontal"){
		draw_line_without_pattern_support(ctx, left, mid_y, size, mid_y);
	}else if(shape === "vertical"){
		draw_line_without_pattern_support(ctx, mid_x, top, mid_x, size);
	}
}