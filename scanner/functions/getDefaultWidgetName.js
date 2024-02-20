function getDefaultWidgetName(xdNode) {
	if (!isWidget(xdNode)) { return null; }
	return cleanClassName(xdNode.name, _getNormalizeNames());
}