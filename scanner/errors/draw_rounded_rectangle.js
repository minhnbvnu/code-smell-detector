function draw_rounded_rectangle(ctx, x, y, width, height, radius_x, radius_y, stroke, fill){
		const arc = (x, y, radius_x, radius_y, startAngle, endAngle)=> {