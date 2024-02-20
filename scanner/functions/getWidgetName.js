function getWidgetName(xdNode) {
	if (!isWidget(xdNode)) { return null; }
	let name = getProp(xdNode, PropType.WIDGET_NAME) || getDefaultWidgetName(xdNode);
   return cleanDartName(_getWidgetPrefix() + name);
}