function parseChildren(node, ctx, mode) {
	let xdNodes = node.xdNode.children;
	for (let i = 0; i < xdNodes.length; ++i) {
		node.children.push(parseScenegraphNode(xdNodes.at(i), ctx, mode, false));
	}
}