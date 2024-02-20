function mergeBounds(xdNodes) {
	if (!xdNodes || xdNodes.length === 0) { return null; }
	let o = {l: null, t: null, b: null, r: null};
	xdNodes.forEach((node)=>{
		let bip = node.boundsInParent
		let l=bip.x, t=bip.y, r=l+bip.width, b=t+bip.height;
		if (o.l === null || l < o.l) { o.l = l; }
		if (o.t === null || t < o.t) { o.t = t; }
		if (o.r === null || r > o.r) { o.r = r; }
		if (o.b === null || b > o.b) { o.b = b; }
	});
	return {x: o.l, y: o.t, width: o.r-o.l, height: o.b-o.t};
}