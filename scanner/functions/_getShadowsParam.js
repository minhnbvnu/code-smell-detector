function _getShadowsParam(xdNode) {
	return (xdNode.shadow == null || !xdNode.shadow.visible ? "" :
		`shadows: [${_getShadow(xdNode.shadow)}], `);
}