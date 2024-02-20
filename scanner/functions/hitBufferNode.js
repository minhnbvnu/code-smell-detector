function hitBufferNode(ctx, i, w){
	var low = hexdigit(i&0xf);
	var mid = hexdigit((i>>4)&0xf);
	var high = hexdigit((i>>8)&0xf);
	ctx.fillStyle = '#'+high+'F'+mid+'F'+low+'F';
	for(i in w) {
		drawSeg(ctx, w[i]);
		ctx.fill();
	}
}