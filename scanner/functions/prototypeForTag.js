function prototypeForTag(tag) {
	if (typeof window == "undefined") return null;
	if (typeof window[tag] == "undefined") return null;
	var constructor = window[tag];
	if (typeof constructor != "function") return null;
	return constructor.prototype;
	}