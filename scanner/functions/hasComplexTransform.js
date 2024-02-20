function hasComplexTransform(node, error, ctx) {
	let o = node.transform;
	if (!o.flipY && o.rotation % 360 === 0) { return false; }
	if (error && ctx) { ctx.log.warn(error, node.xdNode); }
	return true;
}