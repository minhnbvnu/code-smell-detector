function ctxDrawBox(ctx, xMin, yMin, xMax, yMax){
	var cap=ctx.lineCap;
	ctx.lineCap="square";
	ctx.beginPath();
	ctx.moveTo(xMin, yMin);
	ctx.lineTo(xMin, yMax);
	ctx.lineTo(xMax, yMax);
	ctx.lineTo(xMax, yMin);
	ctx.lineTo(xMin, yMin);
	ctx.stroke();
	ctx.lineCap=cap;
}