function __calculateTransform(items, t="") {
	if (!items || !items.length) { return; }
	items.forEach(o => {
		// Artboards always return 0,0,w,h for their localBounds, even when content exceeds the canvas edges
		let lb = o.localBounds, pb = o.parent.localBounds, tl = o.topLeftInParent;
		if (o instanceof xd.Artboard) { tl = pb = {x:0, y:0}; }
		let rect = {
			x: tl.x - pb.x,
			y: tl.y - pb.y,
			width: lb.width,
			height: lb.height,
		}
		trace(`${t}-> ${o.name}`);
		trace(`${t} • rotation: ${$.fix(o.rotation)}`);
		trace(`${t} • rect: ${__rectToString(rect)}`);
		__calculateTransform(o.children, t+"  ");
	})
}