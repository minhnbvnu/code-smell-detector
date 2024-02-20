function getTagIE(o) {
	var tag = getTag(o);
	var newTag = quickMap[tag];
	if (newTag) return newTag;
	if (tag == "Object") {
		if (window.DataView && (o instanceof window.DataView)) return "DataView";
	}
	return tag;
	}