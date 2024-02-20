function _getWidgetPrefix() {
	let o = xd.root.pluginData;
	return o ? o[PropType.WIDGET_PREFIX] || '' : DEFAULT_CLASS_PREFIX;
}