function hiliteTrans(n){
	var ctx = hilite.getContext('2d');
	ctx.strokeStyle = 'rgba(255,255,255,0.7)';
	ctx.lineWidth = 4
	for(var t in n){
		var bb = transistors[n[t]].bb
		var segs = [[bb[0], bb[2], bb[1], bb[2], bb[1], bb[3], bb[0], bb[3]]] 
		for(var s in segs){drawSeg(ctx, segs[s]); ctx.stroke();}
	}
}