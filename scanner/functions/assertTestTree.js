function assertTestTree(e, node, nodeName, parentName) {

	// 标注下方便bug定位
	e.TestTarget(node.name);
	e.AssertEqual(node.left, e.NodeLayoutGetLeft(nodeName));
	e.AssertEqual(node.top, e.NodeLayoutGetTop(nodeName));
	e.AssertEqual(node.width, e.NodeLayoutGetWidth(nodeName));
	e.AssertEqual(node.height, e.NodeLayoutGetHeight(nodeName));

	for (var i=0; i<node.children.length; i++ ) {
		e.push('');
		var childName = nodeName + '_child' + i;
		assertTestTree(e, node.children[i], childName, nodeName);
	}
}