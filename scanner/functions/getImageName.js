function getImageName(xdNode) {
	if (!xdNode.fill) { return null; }
	let name, hash = getImageHash(xdNode), id = getImageId(xdNode);
	let o = xd.root.pluginData, map = o && o.imageMap;
	if (id) { name = map && map[id]; }
    if (!name && hash) { // for backwards compatibility.
		name = map && map[hash];
    }
    return name || getProp(xdNode, PropType.IMAGE_FILL_NAME) || null;
}