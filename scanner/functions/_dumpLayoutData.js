function _dumpLayoutData(selection, root) {
	let xdNode = selection.items[0];
	console.clear();
	trace(JSON.stringify(xdNode.layout, null, "\t"));
}