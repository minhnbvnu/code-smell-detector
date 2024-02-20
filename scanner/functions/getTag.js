function getTag(o) {
	var s = toStringFunction.call(o);
	return s.substring(8, s.length - 1);
	}