function _getFontFamily(o) {
	return NodeUtils.getFlutterFont(o.fontFamily) || o.fontFamily;
}