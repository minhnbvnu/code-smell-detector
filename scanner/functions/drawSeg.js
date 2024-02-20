function drawSeg(ctx, seg){
	var dx = grChipOffsetX;
	var dy = grChipOffsetY;
	ctx.beginPath();
	ctx.moveTo(grScale(seg[0]+dx), grScale(grChipSize-seg[1]+dy));
	for(var i=2;i<seg.length;i+=2) ctx.lineTo(grScale(seg[i]+dx), grScale(grChipSize-seg[i+1]+dy));
	ctx.lineTo(grScale(seg[0]+dx), grScale(grChipSize-seg[1]+dy));
}