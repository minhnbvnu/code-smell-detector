function getAdjustedBounds(xdNode, ctx) {
	// finds the untransformed bounds within the parent, adjusting for parent padding and scrolling

	// Note: Artboards always return x/y=0 & w/h = specified size for localBounds, even if children exceed edges.
	let bip = xdNode.boundsInParent, lb = xdNode.localBounds;
	let parent = xdNode.parent, pb = parent.localBounds;

	// calculate the untransformed top left corner, by finding the center
	// and subtracting half the untransformed w & h:
	let x = bip.x + bip.width/2 - lb.width/2;
	let y = bip.y + bip.height/2 - lb.height/2;
	let b = {
		x: x - pb.x,
		y: y - pb.y,
		width: lb.width,
		height: lb.height,
	}

	// adjust for parent padding:
	let pad = normalizePadding(parent.layout.padding && parent.layout.padding.values);
	if (pad) {
		b.x -= pad.left;
		b.y -= pad.top;
	}

	// adjust for scrolling:
	let offset = getScrollOffset(xdNode.parent, ctx);
	if (offset) {
		b.x += offset.x;
		b.y += offset.y;
	}

	return b;
}