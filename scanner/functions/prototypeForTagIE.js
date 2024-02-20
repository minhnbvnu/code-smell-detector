function prototypeForTagIE(tag) {
	var constructor = window[tag];
	if (constructor == null) return null;
	return constructor.prototype;
	}