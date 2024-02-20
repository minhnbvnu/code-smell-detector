function setProp(xdNode, prop, value) {
	let o = xdNode.pluginData || {};
	o[prop] = value;
	xdNode.pluginData = o;
}