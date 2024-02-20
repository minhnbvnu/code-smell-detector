function getImageHash(xdNode) {
	// This only works on images that have been dragged into XD from the file system.
	let path = _getImageFillName(xdNode.fill);
	return path ? $.getHash(path) : null;
}