function _printTree(node, t="") {
	let str = `\n${t}${node.xdNode.name}(${node.constructor.name}, ${node.xdNode.constructor.name})`;
	let kids = node.children;
	for (var i=0; kids && (i<kids.length); i++) {
		str += _printTree(kids[i], t+"\t");
	}
	if (!t) { trace(str); }
	return str;
}