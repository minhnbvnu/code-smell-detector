function _getRenditionType(xdNode) {
	let fill = xdNode.fill;
	if (!fill || !(fill instanceof xd.ImageFill)) { return null; }
	return fill.mimeType === 'image/jpeg' ? app.RenditionType.JPG : app.RenditionType.PNG
}