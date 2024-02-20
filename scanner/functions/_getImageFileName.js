function _getImageFileName(xdNode) {
	let ext = _getImageExtension(xdNode), name = NodeUtils.getImageName(xdNode);
	return ext && name ? `${name}.${ext}` : null;
}