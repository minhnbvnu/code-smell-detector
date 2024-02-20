function boxLabel(args) {
	var text = args[0];
	var textsize = args[1];
	var thickness = 1+ textsize / 20;
	var boxXmin = args[2] * grCanvasSize / grChipSize;
	var boxYmin = args[3] * grCanvasSize / grChipSize;
	var boxXmax = args[4] * grCanvasSize / grChipSize;
	var boxYmax = args[5] * grCanvasSize / grChipSize;
	ctx.lineWidth   = thickness;
	ctx.font        = textsize + 'px sans-serif';
	ctx.fillStyle   = '#ff0';  // yellow
	ctx.fillStyle   = '#f8f';  // magenta
	ctx.fillStyle   = '#fff';  // white
	ctx.strokeStyle = '#fff';  // white
	if(args.length>4){
		ctxDrawBox(ctx, boxXmin, boxYmin, boxXmax, boxYmax);
		// offset the text label to the interior of the box
		boxYmin -= thickness * 2;
	}
	ctx.strokeStyle = '#fff';  // white
	ctx.strokeStyle = '#000';  // black
	ctx.lineWidth   = thickness*2;
	ctx.strokeText(text, boxXmin, boxYmin);
	ctx.fillText(text, boxXmin, boxYmin);
}