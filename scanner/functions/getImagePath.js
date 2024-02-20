function getImagePath(xdNode) {
	let name = _getImageFileName(xdNode);
	return name ? `${project.images.path}/${name}` : null;
}