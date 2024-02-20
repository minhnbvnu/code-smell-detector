function getGroupContentBounds(xdNode, ctx) {
	// adjusts group bounds to account for inner padding.
	let b = xdNode.localBounds;
	let pad = normalizePadding(xdNode.layout.padding && xdNode.layout.padding.values);
	
	return !pad ? b : {
		x: b.x + pad.left,
		y: b.y + pad.top,
		width: b.width - pad.left - pad.right,
		height: b.height - pad.top - pad.bottom
	}
}