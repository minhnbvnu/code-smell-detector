function overlayNode(w){
	ctx.fillStyle = 'rgba(255,0,64,0.4)';
	for(i in w) {
		drawSeg(ctx, w[i]);
		ctx.fill();
	}
}