function draw_rounded_rectangle(ctx, x, y, width, height, radius_x, radius_y, stroke, fill){
	
	if(aliasing){
		const points = [];
		const lineTo = (x, y)=> {
			points.push({x, y});
		};
		const arc = (x, y, radius_x, radius_y, startAngle, endAngle)=> {
			const step = 0.05;
			for(let theta = startAngle; theta < endAngle; theta += step){
				points.push({
					x: x + Math.cos(theta) * radius_x,
					y: y + Math.sin(theta) * radius_y,
				});
			}
			// not just doing `theta <= endAngle` above because that doesn't account for floating point rounding errors
			points.push({
				x: x + Math.cos(endAngle) * radius_x,
				y: y + Math.sin(endAngle) * radius_y,
			});
		};

		const x2 = x + width;
		const y2 = y + height;
		arc(x2 - radius_x, y + radius_y, radius_x, radius_y, TAU*3/4, TAU, false);
		lineTo(x2, y2 - radius_y);
		arc(x2 - radius_x, y2 - radius_y, radius_x, radius_y, 0, TAU*1/4, false);
		lineTo(x + radius_x, y2);
		arc(x + radius_x, y2 - radius_y, radius_x, radius_y, TAU*1/4, TAU*1/2, false);
		lineTo(x, y + radius_y);
		arc(x + radius_x, y + radius_y, radius_x, radius_y, TAU/2, TAU*3/4, false);

		draw_polygon(ctx, points, stroke, fill);
	}else{
		ctx.beginPath();
		ctx.moveTo(x + radius_x, y);
		ctx.lineTo(x + width - radius_x, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius_y);
		ctx.lineTo(x + width, y + height - radius_y);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius_x, y + height);
		ctx.lineTo(x + radius_x, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius_y);
		ctx.lineTo(x, y + radius_y);
		ctx.quadraticCurveTo(x, y, x + radius_x, y);
		ctx.closePath();
		if(stroke){
			ctx.stroke();
		}
		if(fill){
			ctx.fill();
		}
	}
}