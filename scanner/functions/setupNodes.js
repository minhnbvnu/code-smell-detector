function setupNodes(){
	for(var i in segdefs){
		var seg = segdefs[i];
		var w = seg[0];
		if(nodes[w]==undefined) 
			nodes[w] = {segs: new Array(), num: w, pullup: seg[1]=='+',
			            state: false, gates: new Array(), c1c2s: new Array()};
		if(w==ngnd) continue;
		if(w==npwr) continue;
		nodes[w].segs.push(seg.slice(3));
	}
}