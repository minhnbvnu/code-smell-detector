function _getScrollDirectionParam(node, ctx) {
	let dir = node.xdNode.scrollingType;
	if (dir === xd.ScrollableGroup.PANNING) {
		ctx.log.warn("Panning scroll groups are not supported.", node.xdNode);
	}
	return dir === xd.ScrollableGroup.HORIZONTAL ? "scrollDirection: Axis.horizontal, " : "";
}