function setImageName(xdNode, name) {
    let hash = getImageHash(xdNode);
    if (hash) {
		// set in both the global hash, and on the instance
		// in case a future version of XD breaks the hash again.
        let o = xd.root.pluginData || {};
        if (!o.imageMap) { o.imageMap = {}; }
        o.imageMap[getImageId(xdNode)] = name;
        xd.root.pluginData = o;
    }
    setProp(xdNode, PropType.IMAGE_FILL_NAME, name);
}