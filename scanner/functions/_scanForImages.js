function _scanForImages(xdNode, map) {
	// TODO: GS: should we warn about every unnamed image?
	xdNode.children.forEach((child, i) => {
		if (!child.visible) { return; }
		if (child.fill instanceof xd.ImageFill) {
			let name = NodeUtils.getImageName(child);
			if (name) { map[name] = (map[name] || new _ImageData()).add(child); }
		} else if (child.children) { _scanForImages(child, map); }
	});
	return map;
}