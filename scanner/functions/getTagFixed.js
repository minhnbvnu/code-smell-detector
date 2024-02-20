function getTagFixed(o) {
	var tag = getTag(o);
	if (tag == "Document") {
		if (!!o.xmlVersion) return "!Document";
		return "!HTMLDocument";
	}
	return tag;
	}