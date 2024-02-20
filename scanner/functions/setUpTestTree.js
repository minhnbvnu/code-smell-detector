function setUpTestTree(e, parent, node, nodeName, parentName, index) {
	e.emitTestTreePrologue(nodeName);

	e.SetStyles(node.style, nodeName);
	if (parentName) {
		e.NodeInsertChild(parentName, nodeName, index);
	}

	for (var i=0; i<node.children.length; i++) {
		e.push('');
		var childName = nodeName + '_child' + i;
		setUpTestTree(
			e,
			node,
			node.children[i],
			childName,
			nodeName,
			i);
	}
}