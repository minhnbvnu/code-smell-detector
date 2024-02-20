function getTagFirefox(o) {
	var tag = getTag(o);
	return quickMap[tag] || tag;
	}