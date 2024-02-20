function getScrollOffset(xdNode, ctx) {
	let vp = xdNode.viewport;
	if (!vp) { return null; }
	return {x: vp.offsetX||0, y: vp.offsetY||0};
}