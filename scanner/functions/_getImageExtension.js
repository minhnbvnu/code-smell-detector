function _getImageExtension(xdNode) {
	let type = _getRenditionType(xdNode);
	return !type ? null : type === app.RenditionType.JPG ? "jpg" : "png";
}