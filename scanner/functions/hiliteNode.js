function hiliteNode(n){
	var ctx = hilite.getContext('2d');
	ctx.clearRect(0,0,grCanvasSize,grCanvasSize);
	if(n==-1) return;
	hilited = n;

	for(var i in n){
		if(typeof n[i] != "number") {
			hiliteTrans([n[i]]);
			continue;
		}
		if(isNodeHigh(n[i])) {
			ctx.fillStyle = 'rgba(255,0,0,0.7)';
		} else {
			ctx.fillStyle = 'rgba(255,255,255,0.7)';
		}
		var segs = nodes[n[i]].segs;
		for(var s in segs){drawSeg(ctx, segs[s]); ctx.fill();}
	}
}