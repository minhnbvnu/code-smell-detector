function getInteractionCount(xdNode) {
	if (!xdNode || !xdNode.triggeredInteractions) { return 0; }
	let enabled = getProp(xd.root, PropType.ENABLE_PROTOTYPE);
	return enabled === false ? 0 : xdNode.triggeredInteractions.length;
}