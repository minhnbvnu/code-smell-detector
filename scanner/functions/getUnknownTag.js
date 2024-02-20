function getUnknownTag(object, tag) {
	if (/^HTML[A-Z].*Element$/.test(tag)) {
		var name = toStringFunction.call(object);
		if (name == "[object Object]") return null;
		return "HTMLElement";
	}
	}