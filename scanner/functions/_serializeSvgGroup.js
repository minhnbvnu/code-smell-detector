function _serializeSvgGroup(node, ctx, ignoreTransform=false) {
	let result = "";
	for (let i = 0; i < node.nodes.length; ++i) {
		let o = node.nodes[i];
		if (o instanceof Shape) {
			result += _serializeSvgGroup(o, ctx);
		} else {
			result += _serializeSvgNode(o, ctx);
		}
	}
	if (!ignoreTransform) {
		let xform = _getSvgTransform(node.xdNode.transform);
		result = `<g transform="${xform}">${result}</g>`;
	}
	return result;
}