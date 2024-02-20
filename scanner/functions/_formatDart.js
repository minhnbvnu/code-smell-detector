function _formatDart(str, nestInFunct, ctx, node) {
	let result = null, xdNode = node && node.xdNode;
	try {
		result = formatDart(str, nestInFunct);
	} catch(e) {
		trace(e);
		ctx.log.error('Unable to format the exported source code.', xdNode);
	}
	return result;
}